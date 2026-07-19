<template>
  <div v-if="!quizStore.answers.length" class="max-w-2xl mx-auto text-center py-12 text-gray-500 dark:text-gray-400">
    {{ $t('quiz.noSession') }}
    <router-link to="/" class="text-brand dark:text-brand-muted hover:underline">{{ $t('quiz.startNew') }}</router-link>
  </div>
  <div v-else class="max-w-2xl mx-auto">
    <button @click="router.push('/results')" class="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
      {{ $t('review.back') }}
    </button>

    <h2 class="text-2xl font-extrabold mb-5">{{ $t('review.title') }}</h2>

    <div class="space-y-4">
      <div
        v-for="(item, i) in quizStore.answers" :key="i"
        class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-5 transition-colors"
        :class="item.correct ? 'ring-2 ring-green-300 dark:ring-green-700' : 'ring-2 ring-red-300 dark:ring-red-700'"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-gray-400 dark:text-gray-500">{{ $t('review.question', { n: i + 1 }) }}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
            :class="item.correct ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'"
          >{{ item.correct ? $t('review.correct') : $t('review.wrong') }}</span>
        </div>

        <p class="text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 mb-3 leading-relaxed">
          {{ renderSentence(item.question.sentence) }}
        </p>

        <div class="space-y-1.5 text-sm">
          <p v-if="!item.correct" class="text-red-600 dark:text-red-400">
            {{ $t('review.yourAnswer') }} <span class="line-through">{{ item.selected === '__timeout__' ? $t('quiz.timeUp') : item.selected }}</span>
          </p>
          <p class="text-green-600 dark:text-green-400">
            {{ $t('review.correctAnswer') }} <span class="font-bold">{{ item.question.answer }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/quiz.js'

const router = useRouter()
const quizStore = useQuizStore()

function renderSentence(sentence) {
  return sentence.replace(/___/g, '______')
}
</script>
