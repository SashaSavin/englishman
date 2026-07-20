<template>
  <div class="max-w-3xl mx-auto">
    <button @click="goBack" class="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
      {{ $t('activity.back') }}
    </button>

    <div class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-8 transition-colors">
      <h2 class="text-2xl font-extrabold mb-1">{{ $t('activity.title') }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ $t('activity.subtitle') }}</p>

    <div class="flex gap-4 md:gap-6 mb-8">
      <div>
        <span class="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">{{ stats.total }}</span>
        <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-1">{{ $t('activity.totalQuizzes') }}</span>
      </div>
      <div>
        <span class="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">{{ stats.days }}</span>
        <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-1">{{ $t('activity.activeDays') }}</span>
      </div>
      <div>
        <span class="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">{{ stats.currentStreak }}</span>
        <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-1">{{ $t('activity.streak') }}</span>
      </div>
    </div>

      <div class="overflow-x-auto pb-2">
        <div class="inline-flex" style="padding-left: 30px;">
          <div v-for="m in months" :key="m.label + m.colIndex"
            class="text-[10px] text-gray-400 dark:text-gray-500"
            :style="{ width: m.width + 'px', minWidth: m.width + 'px' }"
          >{{ m.label }}</div>
        </div>

        <div class="flex">
          <div class="flex flex-col gap-[3px]" style="width: 30px; flex-shrink: 0;">
            <span class="h-[12px] text-[10px] text-gray-400 dark:text-gray-500 leading-none flex items-end">{{ days[0] }}</span>
            <span class="h-[12px] text-[10px] text-gray-400 dark:text-gray-500 leading-none"></span>
            <span class="h-[12px] text-[10px] text-gray-400 dark:text-gray-500 leading-none flex items-end">{{ days[1] }}</span>
            <span class="h-[12px] text-[10px] text-gray-400 dark:text-gray-500 leading-none"></span>
            <span class="h-[12px] text-[10px] text-gray-400 dark:text-gray-500 leading-none flex items-end">{{ days[2] }}</span>
          </div>

          <div class="grid gap-[3px]" style="grid-template-rows: repeat(7, 12px); grid-auto-flow: column;">
            <div v-for="(day, i) in flatDays" :key="i"
              :title="day ? tooltip(day) : ''"
              class="w-[12px] h-[12px] rounded-[2px]"
              :class="day && day.count === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''"
              :style="day && day.count > 0 ? { backgroundColor: fillColor(day.count) } : (day ? {} : { visibility: 'hidden' })"
            ></div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 mt-4 justify-end text-[11px] text-gray-400 dark:text-gray-500">
        <span>{{ $t('activity.less') }}</span>
        <span class="w-[12px] h-[12px] rounded-[2px] bg-gray-100 dark:bg-gray-700"></span>
        <span class="w-[12px] h-[12px] rounded-[2px]" :style="{ backgroundColor: brandHex + '33' }"></span>
        <span class="w-[12px] h-[12px] rounded-[2px]" :style="{ backgroundColor: brandHex + '66' }"></span>
        <span class="w-[12px] h-[12px] rounded-[2px]" :style="{ backgroundColor: brandHex + '99' }"></span>
        <span class="w-[12px] h-[12px] rounded-[2px]" :style="{ backgroundColor: brandHex }"></span>
        <span>{{ $t('activity.more') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useActivity } from '../../../shared/composables/useActivity.js'

const router = useRouter()
const { t } = useI18n()
const { getWeeks, getStats } = useActivity()

const brandHex = '#5865F2'

const weeks = computed(() => getWeeks())
const flatDays = computed(() => weeks.value.flat())
const stats = computed(() => getStats())

const dayNames = computed(() => t('activity.days').split('_'))
const monthNames = computed(() => t('activity.months').split('_'))
const days = computed(() => dayNames.value)

const months = computed(() => {
  const names = monthNames.value
  const cols = []
  let prev = -1
  const cellW = 15
  weeks.value.forEach((week, ci) => {
    const day = week.find(d => d !== null)
    if (!day) return
    const m = parseInt(day.date.slice(5, 7))
    if (m !== prev) {
      if (prev !== -1) cols[cols.length - 1].width = ci * cellW - cols[cols.length - 1].colIndex * cellW
      cols.push({ label: names[m - 1], colIndex: ci, width: 0 })
      prev = m
    }
  })
  if (cols.length) {
    const last = cols[cols.length - 1]
    last.width = weeks.value.length * cellW - last.colIndex * cellW
  }
  return cols
})

function fillColor(count) {
  if (count === 0) return 'transparent'
  if (count <= 2) return brandHex + '33'
  if (count <= 5) return brandHex + '66'
  if (count <= 10) return brandHex + '99'
  return brandHex
}

function tooltip(day) {
  return t('activity.quizTooltip', { date: day.date, count: day.count }, day.count)
}

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>
