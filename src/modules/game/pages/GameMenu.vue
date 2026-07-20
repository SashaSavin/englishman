<template>
  <div class="max-w-md mx-auto mt-8 space-y-6">
    <h1 class="text-3xl font-extrabold text-center">{{ $t('game.title') }}</h1>

    <div class="flex flex-col lg:flex-row gap-3">
      <button @click="mode = 'create'"
        class="flex-1 py-3 font-semibold rounded-dc transition-colors"
        :class="mode === 'create'
          ? 'bg-brand text-white border border-brand shadow-sm'
          : 'bg-gray-100 dark:bg-dc-surface text-gray-600 dark:text-dc-text-muted border border-gray-200 dark:border-dc-border hover:bg-gray-200 dark:hover:bg-dc-hover'">
        {{ $t('game.create') }}
      </button>
      <button @click="mode = 'join'"
        class="flex-1 py-3 font-semibold rounded-dc transition-colors"
        :class="mode === 'join'
          ? 'bg-brand text-white border border-brand shadow-sm'
          : 'bg-gray-100 dark:bg-dc-surface text-gray-600 dark:text-dc-text-muted border border-gray-200 dark:border-dc-border hover:bg-gray-200 dark:hover:bg-dc-hover'">
        {{ $t('game.join') }}
      </button>
    </div>

    <form v-if="mode" novalidate @submit.prevent="handleSubmit" class="space-y-3">
      <input v-model="name" :placeholder="$t('game.namePlaceholder')" maxlength="20" required autocomplete="off"
        class="w-full px-4 py-2.5 rounded-dc bg-white dark:bg-dc-input text-gray-800 dark:text-dc-text-normal placeholder:text-gray-400 dark:placeholder:text-dc-text-muted border border-gray-300 dark:border-dc-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors" />

      <input v-if="mode === 'join'" v-model="roomCode" :placeholder="$t('game.codePlaceholder')" maxlength="6" required autocomplete="off"
        class="w-full px-4 py-2.5 rounded-dc bg-white dark:bg-dc-input text-gray-800 dark:text-dc-text-normal placeholder:text-gray-400 dark:placeholder:text-dc-text-muted border border-gray-300 dark:border-dc-border focus:border-brand focus:ring-1 focus:ring-brand outline-none uppercase tracking-widest transition-colors" />

      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      <p v-if="translatedError" class="text-red-400 text-sm">{{ translatedError }}</p>

      <button type="submit" :disabled="!canSubmit || store.loading"
        class="w-full py-3 rounded-dc font-semibold transition-colors"
        :class="canSubmit && !store.loading
          ? 'bg-white dark:bg-brand text-brand dark:text-white border-2 dark:border border-brand dark:border-transparent hover:bg-brand/5 dark:hover:bg-brand-hover'
          : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-transparent'">
        {{ mode === 'create' ? $t('game.createBtn') : $t('game.joinBtn') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/game.js'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const store = useGameStore()
const { t } = useI18n()
const errorMap = {
  'Game not found': () => t('game.errorNotFound'),
  'Request failed': () => t('game.errorRequestFailed'),
}

const translatedError = computed(() => {
  if (!store.error) return ''
  const fn = errorMap[store.error]
  return fn ? fn() : store.error
})

const mode = ref('create')
const name = ref('')
const roomCode = ref('')
const error = ref('')

const canSubmit = computed(() => {
  if (!name.value.trim()) return false
  if (mode.value === 'join' && !roomCode.value.trim()) return false
  return true
})

async function handleSubmit() {
  error.value = ''
  if (!name.value.trim()) {
    error.value = t('game.nameRequired')
    return
  }
  if (mode.value === 'join' && !roomCode.value.trim()) {
    error.value = t('game.codeRequired')
    return
  }
  if (mode.value === 'create') {
    await store.create(name.value)
    if (store.code) router.push(`/game/${store.code}`)
  } else {
    await store.join(name.value, roomCode.value.toUpperCase())
    if (store.code) router.push(`/game/${store.code}`)
  }
}
</script>
