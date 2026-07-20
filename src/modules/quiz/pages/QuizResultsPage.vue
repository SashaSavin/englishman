<template>
  <div v-if="!quizStore.questions.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
    {{ $t('quiz.noSession') }}
    <router-link to="/" class="text-brand dark:text-brand-muted hover:underline">{{ $t('quiz.startNew') }}</router-link>
  </div>
  <div v-else>
    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-10 text-center transition-colors">
      <div class="text-6xl mb-6">{{ emoji }}</div>
      <h2 class="text-2xl font-extrabold mb-2">{{ $t('results.title') }}</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        {{ $t('results.summary', { score: quizStore.score, total: quizStore.totalQuestions }) }}
      </p>

      <div class="relative mb-8">
        <svg class="w-32 h-32 mx-auto" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="8" class="text-gray-200 dark:text-gray-700" />
          <circle cx="60" cy="60" r="54" fill="none" :stroke="ringColor" stroke-width="8"
            stroke-dasharray="339.292" :stroke-dashoffset="ringOffset"
            stroke-linecap="round" transform="rotate(-90 60 60)" class="transition-all duration-1000" />
          <text x="60" y="60" text-anchor="middle" dominant-baseline="central" font-size="24" font-weight="bold" :fill="ringColor">{{ percent }}%</text>
        </svg>
      </div>

      <h3 class="text-base font-bold">{{ messageParts[0] }}</h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">{{ messageParts[1] }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button @click="tryAgain" class="w-full px-4 py-3 bg-brand text-white rounded-dc font-semibold hover:bg-brand-hover transition-colors text-sm leading-tight">
          {{ $t('results.tryAgain') }}
        </button>
        <button @click="changeFilters" class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-dc font-semibold hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-sm leading-tight">
          {{ $t('results.changeFilters') }}
        </button>
        <button @click="reviewAnswers" class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-dc font-semibold hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-sm leading-tight">
          {{ $t('results.review') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '../store/quiz.js'
import { useActivity } from '../../../shared/composables/useActivity.js'

const router = useRouter()
const quizStore = useQuizStore()
const { t } = useI18n()
const { logActivity } = useActivity()

onMounted(() => {
  if (!quizStore.questions.length) {
    router.replace('/')
  } else {
    logActivity()
  }
})

function tryAgain() {
  quizStore.reset()
  router.push('/')
}

function changeFilters() {
  quizStore.reset()
  router.push('/')
}

function reviewAnswers() {
  router.push('/review')
}

const percent = computed(() => quizStore.totalQuestions > 0 ? Math.round((quizStore.score / quizStore.totalQuestions) * 100) : 0)

const emoji = computed(() => percent.value >= 90 ? '🏆' : percent.value >= 75 ? '🌟' : percent.value >= 50 ? '👍' : '💪')

const messageKey = computed(() => {
  if (percent.value === 100) return 'results.perfect'
  if (percent.value >= 90) return 'results.excellent'
  if (percent.value >= 75) return 'results.great'
  if (percent.value >= 50) return 'results.good'
  return 'results.keepGoing'
})

const messageParts = computed(() => {
  const msg = t(messageKey.value)
  const idx = Math.min(
    msg.indexOf('!') === -1 ? Infinity : msg.indexOf('!'),
    msg.indexOf('.') === -1 ? Infinity : msg.indexOf('.')
  )
  if (idx === -1) return [msg, '']
  return [msg.slice(0, idx + 1), msg.slice(idx + 1).trim()]
})

const ringColor = computed(() => percent.value >= 80 ? '#22c55e' : percent.value >= 50 ? '#eab308' : '#ef4444')

const ringOffset = computed(() => {
  const circumference = 2 * Math.PI * 54
  return circumference - (percent.value / 100) * circumference
})
</script>
