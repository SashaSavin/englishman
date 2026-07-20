<template>
  <div class="max-w-lg mx-auto mt-8 space-y-6 text-center">
    <h1 class="text-3xl font-extrabold">{{ $t('game.results') }}</h1>

    <div v-if="winner" class="p-8 rounded-dc-md bg-white dark:bg-dc-surface space-y-2">
      <div class="text-6xl mb-2">🏆</div>
      <p class="text-2xl font-extrabold text-brand">{{ winner.name }}</p>
      <p class="text-gray-500 dark:text-dc-text-muted">{{ $t('game.winner') }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="p in players" :key="p.id"
        class="p-4 rounded-dc-md text-center"
        :class="p.id === winner?.id ? 'bg-brand/20 ring-2 ring-brand' : 'bg-white dark:bg-dc-surface'">
        <p class="font-bold text-lg">{{ p.name }}{{ p.id === store.playerId ? ` (${$t('game.you')})` : '' }}</p>
        <p class="text-3xl font-extrabold mt-2">{{ p.score }}<span class="text-base font-normal text-dc-text-muted">/{{ p.total }}</span></p>
        <p v-if="p.time_seconds != null" class="text-sm text-gray-500 dark:text-dc-text-muted mt-1">{{ formatTime(p.time_seconds) }}</p>
        <p v-else class="text-sm text-gray-500 dark:text-dc-text-muted mt-1">{{ $t('game.dnf') }}</p>
      </div>
    </div>

    <router-link to="/game"
      class="inline-block w-full py-3 rounded-dc font-semibold text-center text-white bg-brand hover:bg-brand-hover transition-colors">
      {{ $t('game.playAgain') }}
    </router-link>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '../store/game.js'

const store = useGameStore()
const players = computed(() => store.game?.players || [])
const winner = computed(() => {
  const finished = players.value.filter(p => p.time_seconds != null)
  if (finished.length === 0) return null
  return finished.reduce((a, b) => (a.time_seconds < b.time_seconds ? a : b))
})

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

onMounted(() => {
  store.startPolling()
})
</script>
