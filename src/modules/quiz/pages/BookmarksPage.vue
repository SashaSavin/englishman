<template>
  <div>
    <button @click="goBack" class="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
      {{ $t('bookmarks.back') }}
    </button>

    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-8 transition-colors">
      <div class="mb-6 md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-extrabold">{{ $t('bookmarks.title') }}</h2>
        <span class="block mt-1 md:mt-0 text-sm text-gray-400 dark:text-gray-500">{{ bookmarkedQuestions.length }} / {{ questionBank.length }}</span>
      </div>

      <div v-if="!bookmarkedQuestions.length" class="text-center py-12 text-gray-400 dark:text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <p class="mb-4">{{ $t('bookmarks.empty') }}</p>
        <router-link to="/" class="text-brand dark:text-brand-muted hover:underline text-sm">{{ $t('bookmarks.goPractice') }}</router-link>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="q in bookmarkedQuestions" :key="q.id"
          class="flex items-start gap-3 p-4 rounded-dc border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">{{ renderSentence(q.sentence) }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              <span class="font-semibold" :class="tenseColor(q.tense)">{{ $t('tense.' + q.tense) }}</span>
              &middot;
              <span class="font-semibold" :class="formColor(q.form)">{{ formLabel(q.form) }}</span>
            </p>
          </div>
          <button
            @click="toggle(q.id)"
            class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :title="$t('bookmarks.remove')"
          >
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>

        <div class="text-center pt-4">
          <p class="text-sm text-gray-400 dark:text-gray-500 mb-4">
            {{ $t('bookmarks.available', { count: bookmarkedQuestions.length }) }}
          </p>
          <button
            @click="startQuizWithBookmarks"
            class="px-10 py-3.5 text-lg rounded-dc font-semibold transition-all shadow-md bg-brand text-white hover:bg-brand-hover cursor-pointer"
          >{{ $t('bookmarks.start') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBookmarks } from '../../../shared/composables/useBookmarks.js'
import { useQuizStore } from '../store/quiz.js'
import { questionBank } from '../../../shared/data/questions.js'

const router = useRouter()
const { t } = useI18n()
const { bookmarks, toggle } = useBookmarks()
const quizStore = useQuizStore()

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

const bookmarkedQuestions = computed(() =>
  questionBank.filter(q => bookmarks.value.has(q.id))
)

function renderSentence(s) { return s.replace(/___/g, '______') }

function tenseColor(tense) {
  return {
    'present-simple': 'text-blue-600 dark:text-blue-400',
    'past-simple': 'text-purple-600 dark:text-purple-400',
    'future-simple': 'text-emerald-600 dark:text-emerald-400',
  }[tense] || ''
}

function formColor(form) {
  return {
    affirmative: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    question: 'text-amber-600 dark:text-amber-400',
  }[form] || ''
}

function formLabel(form) {
  return t('setup.form' + form.charAt(0).toUpperCase() + form.slice(1))
}

function startQuizWithBookmarks() {
  const shuffled = [...bookmarkedQuestions.value].sort(() => Math.random() - 0.5)
  const count = Math.min(shuffled.length, 15)
  quizStore.startQuiz(shuffled.slice(0, count))
  router.push('/quiz')
}
</script>
