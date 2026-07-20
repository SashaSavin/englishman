<template>
  <div>
    <div v-if="showHero" class="relative rounded-dc-md mb-6 overflow-hidden select-none"
      :class="bgGradient"
      @mouseenter="pause = true"
      @wheel.passive="onWheel"
      @mousedown="onDragStart" @mousemove="onDragMove" @mouseup="onDragEnd" @mouseleave="onDragEnd"
      @touchstart.passive="onDragStart" @touchmove.passive="onDragMove" @touchend="onDragEnd">
      <button @click="showHero = false" class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div class="p-8 md:p-10 text-white">
        <template v-if="current === 0">
          <p class="text-sm md:text-base text-white/80 font-semibold">{{ $t('setup.heroWelcome') }}</p>
          <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">Englishman</h1>
          <p class="text-white/70 mt-1.5 text-sm md:text-base max-w-lg">{{ $t('setup.heroSub') }}</p>
        </template>
        <template v-else-if="current === 1 && stats">
          <p class="text-sm md:text-base text-white/80 font-semibold">{{ $t('setup.heroStats') }}</p>
          <div class="flex items-center gap-8 md:gap-12 mt-3">
            <div class="text-center">
              <p class="text-2xl md:text-3xl font-extrabold">{{ stats.total }}</p>
              <p class="text-white/60 text-xs md:text-sm mt-0.5">{{ $t('activity.totalQuizzes') }}</p>
            </div>
            <div class="text-center">
              <p class="text-2xl md:text-3xl font-extrabold">{{ stats.currentStreak }}</p>
              <p class="text-white/60 text-xs md:text-sm mt-0.5">{{ $t('activity.streak') }}</p>
            </div>
            <div v-if="bookmarkCount" class="text-center">
              <p class="text-2xl md:text-3xl font-extrabold">{{ bookmarkCount }}</p>
              <p class="text-white/60 text-xs md:text-sm mt-0.5">{{ $t('setup.bookmarks') }}</p>
            </div>
          </div>
        </template>
        <template v-else-if="current === 2">
          <p class="text-sm md:text-base text-white/80 font-semibold">{{ $t('setup.heroPractice') }}</p>
          <p class="text-lg md:text-xl font-bold mt-1">{{ $t('quiz.reviewTheory') }}</p>
          <router-link to="/theory"
            class="inline-block mt-3 text-xs font-semibold text-white/70 hover:text-white underline underline-offset-2 transition-colors">
            {{ $t('tooltip.readTheory') }}
          </router-link>
        </template>
      </div>

      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <button v-for="(_, i) in slides" :key="i" @click="current = i"
          class="rounded-full transition-all duration-200"
          :class="current === i ? 'bg-white w-5 h-1.5' : 'bg-white/40 w-1.5 h-1.5 hover:bg-white/60'" />
      </div>
    </div>

    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-10 transition-colors">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-extrabold mb-2">{{ $t('setup.title') }}</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-normal">{{ $t('setup.description') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
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
            <div class="font-semibold text-xs" :class="tenseTextClass(t)">{{ t.label }}</div>
            <div class="text-xs mt-0.5" :class="tenseSubClass(t)">Simple</div>
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-gray-600 dark:text-gray-300">{{ $t('setup.forms') }}</h3>
            <div class="flex gap-2 text-xs">
              <button @click="selectAllForms" class="text-brand dark:text-brand-muted hover:underline">{{ $t('setup.selectAll') }}</button>
              <button @click="clearAllForms" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">{{ $t('setup.clear') }}</button>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="f in formMeta" :key="f.key"
              @click="toggleForm(f.key)"
              class="p-2 md:p-4 rounded-dc-md text-center border-2 transition-all duration-200"
              :class="formBtnClass(f.key)"
            >
              <div class="font-semibold text-sm">{{ f.label.split(' ')[0] }}</div>
              <div class="text-xs mt-0.5 truncate">{{ f.label.split(' ').slice(1).join(' ') }}</div>
            </button>
          </div>
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

      <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400 dark:text-gray-500 space-x-2">
        <router-link to="/theory" class="hover:text-brand dark:hover:text-brand-muted transition-colors">{{ $t('quiz.reviewTheory') }}</router-link>
        <span>&middot;</span>
        <router-link to="/game" class="hover:text-brand dark:hover:text-brand-muted transition-colors">{{ $t('setup.playWithFriend') }}</router-link>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '../store/quiz.js'
import { questionBank } from '../../../shared/data/questions.js'
import { useActivity } from '../../../shared/composables/useActivity.js'
import SettingsModal from '../components/SettingsModal.vue'
import BaseButton from '../../../components/BaseButton.vue'

const router = useRouter()
const quizStore = useQuizStore()
const { t } = useI18n()

const showHero = ref(true)
const slides = [{}, {}, {}]
const current = ref(0)
const pause = ref(false)
const { getStats } = useActivity()
const stats = computed(() => getStats())
const bgGradient = computed(() => {
  const gradients = [
    'bg-gradient-to-r from-brand to-blue-600',
    'bg-gradient-to-r from-green-600 to-emerald-700',
    'bg-gradient-to-r from-amber-600 to-orange-700',
  ]
  return gradients[current.value]
})

function next() { current.value = (current.value + 1) % slides.length }
function prev() { current.value = (current.value - 1 + slides.length) % slides.length }

let dragStart = 0
let dragging = false
function onDragStart(e) {
  pause.value = true
  dragStart = e.clientX || e.touches?.[0]?.clientX || 0
  dragging = true
}
function onDragMove(e) {
  if (!dragging) return
  const x = e.clientX || e.touches?.[0]?.clientX || 0
  const diff = x - dragStart
  if (Math.abs(diff) > 60) {
    dragging = false
    diff > 0 ? prev() : next()
  }
}
function onDragEnd() {
  dragging = false
  pause.value = false
}

function onWheel(e) {
  if (Math.abs(e.deltaX) > 20) {
    e.deltaX > 0 ? next() : prev()
  }
}

let timer
onMounted(() => {
  timer = setInterval(() => {
    if (!pause.value) next()
  }, 5000)
})
onUnmounted(() => clearInterval(timer))

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
