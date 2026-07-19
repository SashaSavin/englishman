<template>
  <div class="max-w-md mx-auto mt-8 space-y-6">
    <h1 class="text-3xl font-extrabold text-center">{{ $t('game.title') }}</h1>

    <div class="space-y-4">
      <button @click="mode = 'create'" class="w-full py-3 rounded-dc font-semibold text-white bg-dc-brand hover:bg-dc-brand-hover transition-colors">
        {{ $t('game.create') }}
      </button>
      <button @click="mode = 'join'" class="w-full py-3 rounded-dc font-semibold text-dc-text bg-dc-surface-alt hover:bg-dc-surface-hover transition-colors">
        {{ $t('game.join') }}
      </button>
    </div>

    <form v-if="mode" @submit.prevent="handleSubmit" class="space-y-4">
      <input v-model="name" :placeholder="$t('game.namePlaceholder')" maxlength="20" required
        class="w-full px-4 py-2.5 rounded-dc bg-dc-surface-alt text-dc-text border border-dc-border focus:border-dc-brand outline-none" />

      <input v-if="mode === 'join'" v-model="roomCode" :placeholder="$t('game.codePlaceholder')" maxlength="6" required
        class="w-full px-4 py-2.5 rounded-dc bg-dc-surface-alt text-dc-text border border-dc-border focus:border-dc-brand outline-none uppercase tracking-widest" />

      <p v-if="store.error" class="text-red-400 text-sm">{{ store.error }}</p>

      <button type="submit" :disabled="store.loading"
        class="w-full py-3 rounded-dc font-semibold text-white bg-dc-brand hover:bg-dc-brand-hover transition-colors disabled:opacity-50">
        {{ mode === 'create' ? $t('game.createBtn') : $t('game.joinBtn') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/game.js'

const router = useRouter()
const store = useGameStore()
const mode = ref(null)
const name = ref('')
const roomCode = ref('')

async function handleSubmit() {
  if (mode.value === 'create') {
    await store.create(name.value)
    if (store.code) router.push(`/game/${store.code}`)
  } else {
    await store.join(name.value, roomCode.value.toUpperCase())
    if (store.code) router.push(`/game/${store.code}`)
  }
}
</script>
