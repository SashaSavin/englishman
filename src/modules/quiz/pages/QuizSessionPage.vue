<template>
  <div v-if="!quizStore.questions.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
    {{ $t('quiz.noSession') }}
    <router-link to="/" class="text-brand dark:text-brand-muted hover:underline">{{ $t('quiz.startNew') }}</router-link>
  </div>
  <div v-else>
    <button @click="exitQuiz" class="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
      {{ $t('quiz.exit') }}
    </button>

    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-8 transition-colors">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{{ quizStore.currentIndex + 1 }} / {{ quizStore.totalQuestions }}</span>
          <div class="flex items-center gap-3">
            <span v-if="quizStore.timerEnabled" :class="timerClass">{{ $t('quiz.timeLeft', { s: quizStore.timeLeft }) }}</span>
            <span class="font-bold" :class="scoreColor">{{ quizStore.score }} {{ $t('quiz.correct') }}</span>
          </div>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div class="h-2.5 rounded-full transition-all duration-500 ease-out" :class="progressColor" :style="{ width: quizStore.progress + '%' }"></div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 mb-6">
        <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="tenseClass">{{ $t('tense.' + (quizStore.currentQuestion?.tense || '')) }}</span>
        <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="formClass">{{ $t('setup.form' + (quizStore.currentQuestion?.form || '')?.charAt(0).toUpperCase() + (quizStore.currentQuestion?.form || '').slice(1)) }}</span>
        <HelpTooltip
          :tense="quizStore.currentQuestion?.tense"
          :form="quizStore.currentQuestion?.form"
          @show-theory="router.push('/theory')"
        />
      </div>

      <Transition name="slide" mode="out-in">
        <QuestionCard
          :key="quizStore.currentIndex"
          :question="quizStore.currentQuestion"
          :selected="quizStore.selected"
          :shuffled-options="quizStore.shuffledOptions"
          :bookmarked="isBookmarked(quizStore.currentQuestion?.id)"
          @select="selectAnswer"
          @toggle-bookmark="toggleBookmark"
        />
      </Transition>

      <div v-if="quizStore.selected !== null" class="mt-6 text-center">
        <p class="text-lg font-semibold mb-3" :class="quizStore.selected === quizStore.currentQuestion?.answer ? 'text-green-600' : 'text-red-600'">
          {{ quizStore.selected === quizStore.currentQuestion?.answer ? $t('quiz.correctLabel') : $t('quiz.wrongLabel') }}
        </p>
        <p v-if="quizStore.selected !== quizStore.currentQuestion?.answer" class="text-gray-600 dark:text-gray-400 mb-3">
          {{ $t('quiz.correctAnswer') }} <span class="font-bold text-green-600 dark:text-green-400">{{ quizStore.currentQuestion?.answer }}</span>
        </p>
        <button
          @click="nextQuestion"
          class="px-8 py-2.5 bg-brand text-white rounded-dc font-semibold hover:bg-brand-hover transition-colors"
        >
          {{ quizStore.isLastQuestion ? $t('quiz.seeResults') : $t('quiz.next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '../store/quiz.js'
import QuestionCard from '../components/QuestionCard.vue'
import HelpTooltip from '../components/HelpTooltip.vue'
import { useBookmarks } from '../../../shared/composables/useBookmarks.js'

const router = useRouter()
const quizStore = useQuizStore()
const { t } = useI18n()
const { isBookmarked, toggle: toggleBookmark } = useBookmarks()

let timerInterval = null

function startTimer() {
  if (!quizStore.timerEnabled || timerInterval) return
  timerInterval = setInterval(() => {
    if (quizStore.selected !== null) return
    if (quizStore.timeLeft > 0) {
      quizStore.timeLeft--
    } else {
      clearInterval(timerInterval)
      timerInterval = null
      quizStore.selectAnswer('__timeout__')
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

onMounted(() => {
  if (!quizStore.questions.length) return
  if (!quizStore.shuffledOptions.length) {
    quizStore.shuffleOptions()
  }
  startTimer()
})

onUnmounted(stopTimer)

watch(() => quizStore.currentIndex, () => {
  stopTimer()
  startTimer()
})

function selectAnswer(opt) {
  quizStore.selectAnswer(opt)
  stopTimer()
}

function exitQuiz() {
  stopTimer()
  quizStore.reset()
  router.push('/')
}

const scoreColor = computed(() => {
  const idx = quizStore.currentIndex
  const pct = idx === 0 ? 1 : quizStore.score / idx
  if (pct >= 0.8) return 'text-green-600 dark:text-green-400'
  if (pct >= 0.5) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
})

const progressColor = computed(() => {
  const idx = quizStore.currentIndex
  const pct = idx === 0 ? 1 : quizStore.score / idx
  if (pct >= 0.8) return 'bg-green-500'
  if (pct >= 0.5) return 'bg-yellow-500'
  return 'bg-red-500'
})

const timerClass = computed(() => {
  if (quizStore.timeLeft <= 3) return 'text-red-500 font-bold animate-pulse'
  if (quizStore.timeLeft <= 5) return 'text-yellow-500 font-semibold'
  return 'text-gray-500 dark:text-gray-400'
})

const tenseClass = computed(() => ({
  'present-simple': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
  'past-simple': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
  'future-simple': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
}[quizStore.currentQuestion?.tense] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'))

const formClass = computed(() => ({
  affirmative: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
  negative: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
  question: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
}[quizStore.currentQuestion?.form] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'))

function nextQuestion() {
  if (quizStore.isLastQuestion) {
    router.push('/results')
  } else {
    quizStore.nextQuestion()
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
