<template>
  <div class="max-w-lg mx-auto mt-8 space-y-6 text-center">
    <h1 class="text-3xl font-extrabold">{{ $t('game.lobby') }}</h1>

    <div class="p-6 rounded-dc-md bg-dc-surface-alt space-y-4">
      <p class="text-dc-text-muted">{{ $t('game.shareCode') }}</p>
      <div class="text-4xl font-extrabold tracking-[0.2em] text-dc-brand select-all">{{ store.code }}</div>
      <button @click="copyCode" class="text-sm text-dc-brand hover:underline">
        {{ copied ? $t('game.copied') : $t('game.copy') }}
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="font-bold text-lg">{{ $t('game.players') }} ({{ store.game.players.length }}/2)</h2>
      <div v-for="p in store.game.players" :key="p.id"
        class="flex items-center gap-3 px-4 py-3 rounded-dc bg-dc-surface-alt">
        <div class="w-8 h-8 rounded-full bg-dc-brand flex items-center justify-center text-white font-bold text-sm">
          {{ p.name[0].toUpperCase() }}
        </div>
        <span class="font-semibold">{{ p.name }}{{ p.id === store.playerId ? ` (${$t('game.you')})` : '' }}</span>
        <span v-if="p.id === store.playerId" class="ml-auto text-xs text-dc-text-muted">{{ $t('game.waiting') }}</span>
      </div>
    </div>

    <button v-if="store.isCreator && store.game.players.length === 2" @click="handleStart" :disabled="store.loading"
      class="w-full py-3 rounded-dc font-semibold text-white bg-dc-brand hover:bg-dc-brand-hover transition-colors disabled:opacity-50">
      {{ $t('game.startBtn') }}
    </button>

    <p v-else class="text-dc-text-muted italic">{{ $t('game.waitOpponent') }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/game.js'

const router = useRouter()
const store = useGameStore()
const copied = ref(false)

function copyCode() {
  navigator.clipboard.writeText(store.code).then(() => { copied.value = true; setTimeout(() => copied.value = false, 2000) })
}

async function handleStart() {
  await store.start()
  if (store.status === 'playing') router.push(`/game/${store.code}/play`)
}

let unwatch
onMounted(() => {
  unwatch = store.$subscribe(() => {
    if (store.status === 'playing') router.push(`/game/${store.code}/play`)
  })
})

onUnmounted(() => unwatch?.())
</script>
