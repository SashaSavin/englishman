<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-8 transition-colors">
      <h1 class="text-2xl font-extrabold text-center mb-6">{{ $t('game.title') }}</h1>

      <div class="flex bg-gray-100 dark:bg-dc-input rounded-dc p-1 mb-6">
        <button
          v-for="m in modes" :key="m.key"
          @click="mode = m.key"
          class="flex-1 py-2 text-sm font-semibold rounded-dc transition-all"
          :class="mode === m.key
            ? 'bg-white dark:bg-dc-surface text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
        >{{ m.label }}</button>
      </div>

      <form novalidate @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput v-model="name" :placeholder="$t('game.namePlaceholder')" maxlength="20" required />

        <BaseInput v-if="mode === 'join'" v-model="roomCode" :placeholder="$t('game.codePlaceholder')" maxlength="6" required
          class="uppercase tracking-widest" />

        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

        <BaseButton type="submit" :disabled="!canSubmit" :loading="store.loading" variant="primary" class="w-full">
          {{ mode === 'create' ? $t('game.createBtn') : $t('game.joinBtn') }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/game.js'
import { useI18n } from 'vue-i18n'
import { useToast } from '../../../shared/composables/useToast.js'
import BaseInput from '../../../components/BaseInput.vue'
import BaseButton from '../../../components/BaseButton.vue'

const router = useRouter()
const store = useGameStore()
const { t } = useI18n()
const toast = useToast()

const modes = computed(() => [
  { key: 'create', label: t('game.create') },
  { key: 'join', label: t('game.join') },
])

const errorMap = {
  'Game not found': () => t('game.errorNotFound'),
  'Request failed': () => t('game.errorRequestFailed'),
  'Network error': () => t('toast.networkError'),
  'Invalid server response': () => t('toast.invalidResponse'),
}

watch(() => store.error, (val) => {
  if (!val) return
  const fn = errorMap[val]
  toast.error(fn ? fn() : t('toast.somethingWrong'))
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
