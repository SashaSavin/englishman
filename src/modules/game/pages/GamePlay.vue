<template>
  <div class="max-w-2xl mx-auto mt-4 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-extrabold">{{ $t('game.playing') }}</h1>
      <div class="text-2xl font-bold tabular-nums text-dc-brand">{{ formattedTime }}</div>
    </div>

    <div class="flex items-center gap-2 text-sm text-dc-text-muted">
      <div class="w-2 h-2 rounded-full" :class="opponentFinished ? 'bg-green-500' : 'bg-yellow-500'"></div>
      {{ opponentFinished ? $t('game.opponentDone') : $t('game.opponentPlaying') }}
    </div>

    <div v-if="currentQuestion" class="space-y-6">
      <div class="p-6 rounded-dc-md bg-dc-surface-alt">
        <div class="flex items-center gap-2 text-xs text-dc-text-muted mb-3">
          <span class="px-2 py-0.5 rounded bg-dc-surface text-dc-text-muted">{{ $t(`tenses.${currentQuestion.tense}`) }}</span>
          <span class="px-2 py-0.5 rounded bg-dc-surface text-dc-text-muted">{{ $t(`forms.${currentQuestion.form}`) }}</span>
          <span class="ml-auto">{{ currentIndex + 1 }} / {{ questions.length }}</span>
        </div>
        <p class="text-xl font-semibold mb-6">{{ currentQuestion.sentence }}</p>
        <div class="space-y-2">
          <button v-for="opt in currentQuestion.options" :key="opt" @click="selectAnswer(opt)"
            class="w-full text-left px-4 py-3 rounded-dc font-medium transition-colors"
            :class="selectedAnswer === opt
              ? (opt === currentQuestion.answer ? 'bg-green-600 text-white' : 'bg-red-600 text-white')
              : 'bg-dc-surface hover:bg-dc-surface-hover text-dc-text'"
            :disabled="selectedAnswer !== null">
            {{ opt }}
          </button>
        </div>
      </div>

      <div class="flex gap-3">
        <button v-if="selectedAnswer !== null && currentIndex < questions.length - 1" @click="nextQuestion"
          class="flex-1 py-3 rounded-dc font-semibold text-white bg-dc-brand hover:bg-dc-brand-hover transition-colors">
          {{ $t('game.next') }}
        </button>
        <button v-if="selectedAnswer !== null && currentIndex === questions.length - 1" @click="finish"
          class="flex-1 py-3 rounded-dc font-semibold text-white bg-dc-brand hover:bg-dc-brand-hover transition-colors">
          {{ $t('game.finish') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/game.js'

const router = useRouter()
const store = useGameStore()

const questions = computed(() => store.questions)
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const correctCount = ref(0)
const elapsed = ref(0)
let timer = null

const currentQuestion = computed(() => questions.value[currentIndex.value])
const opponentFinished = computed(() => store.opponent?.finished_at != null)

const formattedTime = computed(() => {
  const m = Math.floor(elapsed.value / 60)
  const s = elapsed.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function selectAnswer(opt) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = opt
  if (opt === currentQuestion.value.answer) correctCount.value++
}

function nextQuestion() {
  selectedAnswer.value = null
  currentIndex.value++
}

async function finish() {
  clearInterval(timer)
  await store.submit(correctCount.value, questions.value.length, elapsed.value)
  router.push(`/game/${store.code}/results`)
}

let unwatch
onMounted(() => {
  timer = setInterval(() => elapsed.value++, 1000)
  unwatch = store.$subscribe(() => {
    if (store.status === 'finished' && store.me?.finished_at == null) {
      clearInterval(timer)
      router.push(`/game/${store.code}/results`)
    }
  })
})

onUnmounted(() => {
  clearInterval(timer)
  unwatch?.()
})
</script>
