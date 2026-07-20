<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-10 transition-colors">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-extrabold mb-2">{{ $t('setup.title') }}</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-normal">{{ $t('setup.description') }}</p>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold text-gray-600 dark:text-gray-300">{{ $t('setup.tenses') }}</h3>
          <div class="flex gap-2 text-xs">
            <button @click="selectAllTenses" class="text-brand dark:text-brand-muted hover:underline">{{ $t('setup.selectAll') }}</button>
            <button @click="clearAllTenses" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">{{ $t('setup.clear') }}</button>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="t in tenseMeta" :key="t.key"
            @click="toggleTense(t.key)"
            class="rounded-dc-md p-4 text-center border-2 transition-all duration-200"
            :class="tenseCardClass(t)"
          >
            <div class="font-semibold text-sm" :class="tenseTextClass(t)">{{ t.label }}</div>
            <div class="text-xs mt-0.5" :class="tenseSubClass(t)">Simple</div>
          </button>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold text-gray-600 dark:text-gray-300">{{ $t('setup.forms') }}</h3>
          <div class="flex gap-2 text-xs">
            <button @click="selectAllForms" class="text-brand dark:text-brand-muted hover:underline">{{ $t('setup.selectAll') }}</button>
            <button @click="clearAllForms" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">{{ $t('setup.clear') }}</button>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            v-for="f in formMeta" :key="f.key"
            @click="toggleForm(f.key)"
            class="flex-1 py-3 rounded-dc border-2 font-semibold text-xs md:text-sm leading-tight transition-all duration-200"
            :class="formBtnClass(f.key)"
          >{{ f.label }}</button>
        </div>
      </div>

      <div v-if="bookmarkCount" class="mb-6 flex items-center justify-center gap-2">
        <button
          @click="bookmarksOnly = !bookmarksOnly"
          class="px-4 py-2 rounded-dc text-xs font-semibold border-2 transition-all duration-200 flex items-center gap-1.5"
          :class="bookmarksOnly
            ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
            : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" :fill="bookmarksOnly ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {{ $t('setup.bookmarks') }}
        </button>
        <router-link
          to="/bookmarks"
          class="text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 underline"
        >{{ $t('setup.manageBookmarks') }}</router-link>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-400 dark:text-gray-500 mb-4">
          {{ $t('setup.matchCount', { count: availableCount }) }}
          &middot; {{ $t('setup.perQuiz', { count: quizSize }) }}
        </p>
        <div class="flex items-center justify-center gap-3">
          <BaseButton @click="startQuiz" :disabled="availableCount === 0" variant="primary" size="lg" class="px-10">
            {{ $t('setup.start') }}
          </BaseButton>
          <BaseButton @click="showSettings = true" variant="secondary" class="w-12 h-12 !px-0" title="Settings">
            ⚙️
          </BaseButton>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <router-link to="/theory" class="text-xs text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-brand-muted transition-colors">
          {{ $t('quiz.reviewTheory') }}
        </router-link>
      </div>
    </div>

    <SettingsModal
      v-model="showSettings"
      v-model:questionCount="questionCount"
      v-model:timerEnabled="timerEnabled"
      v-model:timerDuration="timerDuration"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '../store/quiz.js'
import { questionBank } from '../../../shared/data/questions.js'
import SettingsModal from '../components/SettingsModal.vue'
import BaseButton from '../../../components/BaseButton.vue'

const router = useRouter()
const quizStore = useQuizStore()
const { t } = useI18n()

const tenseMeta = computed(() => [
  { key: 'present-simple', label: t('setup.presentLabel'), cardBg: 'bg-blue-50 dark:bg-blue-900/20', ring: 'ring-blue-400', border: 'border-blue-300', text: 'text-blue-700 dark:text-blue-300', sub: 'text-blue-500 dark:text-blue-400' },
  { key: 'past-simple', label: t('setup.pastLabel'), cardBg: 'bg-purple-50 dark:bg-purple-900/20', ring: 'ring-purple-400', border: 'border-purple-300', text: 'text-purple-700 dark:text-purple-300', sub: 'text-purple-500 dark:text-purple-400' },
  { key: 'future-simple', label: t('setup.futureLabel'), cardBg: 'bg-emerald-50 dark:bg-emerald-900/20', ring: 'ring-emerald-400', border: 'border-emerald-300', text: 'text-emerald-700 dark:text-emerald-300', sub: 'text-emerald-500 dark:text-emerald-400' },
])

const formMeta = computed(() => [
  { key: 'affirmative', label: t('setup.formAffirmative'), activeBg: 'bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-300', inactiveBg: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
  { key: 'negative', label: t('setup.formNegative'), activeBg: 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-300', inactiveBg: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
  { key: 'question', label: t('setup.formQuestion'), activeBg: 'bg-amber-100 dark:bg-amber-900/40 border-amber-500 text-amber-700 dark:text-amber-300', inactiveBg: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
])

import { useBookmarks } from '../../../shared/composables/useBookmarks.js'

const { bookmarks, isBookmarked } = useBookmarks()
const bookmarkCount = computed(() => bookmarks.value.size)

const selectedTenses = ref(new Set(['present-simple', 'past-simple', 'future-simple']))
const selectedForms = ref(new Set(['affirmative', 'negative', 'question']))
const showSettings = ref(false)
const questionCount = ref(15)
const timerEnabled = ref(false)
const timerDuration = ref(15)
const bookmarksOnly = ref(false)

function toggleTense(key) {
  const next = new Set(selectedTenses.value)
  next.has(key) ? next.delete(key) : next.add(key)
  selectedTenses.value = next
}
function selectAllTenses() { selectedTenses.value = new Set(tenseMeta.value.map(t => t.key)) }
function clearAllTenses() { selectedTenses.value = new Set() }

function toggleForm(key) {
  const next = new Set(selectedForms.value)
  next.has(key) ? next.delete(key) : next.add(key)
  selectedForms.value = next
}
function selectAllForms() { selectedForms.value = new Set(formMeta.value.map(f => f.key)) }
function clearAllForms() { selectedForms.value = new Set() }

function activeTense(key) { return selectedTenses.value.has(key) }

function tenseCardClass(meta) {
  const active = selectedTenses.value.has(meta.key)
  return {
    [meta.cardBg]: active,
    'bg-gray-50 dark:bg-gray-800/50': !active,
    'ring-2 ring-offset-2 dark:ring-offset-gray-800': active,
    [meta.ring]: active, [meta.border]: active,
    'border-gray-200 dark:border-gray-700': !active,
    'opacity-50': !active, 'cursor-pointer': true,
  }
}
function tenseTextClass(meta) { return activeTense(meta.key) ? meta.text : 'text-gray-500 dark:text-gray-400' }
function tenseSubClass(meta) { return activeTense(meta.key) ? meta.sub : 'text-gray-400 dark:text-gray-500' }

function formBtnClass(key) {
  const m = formMeta.value.find(f => f.key === key)
  return selectedForms.value.has(key) ? m.activeBg : m.inactiveBg
}

const filteredQuestions = computed(() =>
  questionBank.filter(q =>
    selectedTenses.value.has(q.tense) &&
    selectedForms.value.has(q.form) &&
    (!bookmarksOnly.value || isBookmarked(q.id))
  )
)

const availableCount = computed(() => filteredQuestions.value.length)
const quizSize = computed(() => Math.min(questionCount.value, availableCount.value))



function startQuiz() {
  if (availableCount.value === 0) return
  const shuffled = [...filteredQuestions.value].sort(() => Math.random() - 0.5)
  quizStore.startQuiz(
    shuffled.slice(0, quizSize.value),
    timerEnabled.value,
    timerDuration.value
  )
  router.push('/quiz')
}
</script>
