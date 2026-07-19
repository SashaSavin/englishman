<template>
  <div class="relative ml-auto">
    <button
      @click="open = !open"
      class="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold border border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-brand-muted hover:border-brand transition-colors"
      title="Show hint"
    >?</button>
    <div
      v-if="open"
      class="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-700 rounded-dc-md shadow-xl border border-gray-200 dark:border-gray-600 p-4 z-10"
    >
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ $t('tooltip.quickTip') }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-200 mb-3">{{ tip }}</p>
      <button @click="$emit('show-theory')" class="text-xs font-semibold text-brand dark:text-brand-muted hover:underline">
        {{ $t('tooltip.readTheory') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({ tense: String, form: String })
defineEmits(['show-theory'])

const { t, locale } = useI18n()
const open = ref(false)
const isRu = computed(() => locale.value === 'ru')

const tip = computed(() => {
  const tenseTips = {
    'present-simple': isRu.value
      ? 'Используется для привычек, рутины и фактов. К глаголам he/she/it добавляется -s/-es.'
      : 'Use for habits, routines, and facts. Add -s/-es for he/she/it.',
    'past-simple': isRu.value
      ? 'Используется для завершённых действий. Правильные глаголы добавляют -ed, неправильные меняют форму.'
      : 'Use for completed actions. Regular verbs add -ed; irregular verbs change form.',
    'future-simple': isRu.value
      ? 'Используется с "will" для обещаний, предсказаний и спонтанных решений.'
      : 'Use with "will" for promises, predictions, and decisions made now.',
  }
  const formTips = {
    affirmative: isRu.value
      ? 'Утверждение: используйте правильную форму глагола.'
      : 'Affirmative: use the correct verb form.',
    negative: isRu.value
      ? 'Отрицание: добавьте didn\'t (прош.), don\'t/doesn\'t (наст.) или won\'t (буд.) перед глаголом.'
      : 'Negative: add didn\'t (past), don\'t/doesn\'t (present), or won\'t (future) before the verb.',
    question: isRu.value
      ? 'Вопрос: начните с Did (прош.), Do/Does (наст.) или Will (буд.) + подлежащее + глагол.'
      : 'Questions: start with Did (past), Do/Does (present), or Will (future) + subject + verb.',
  }
  return `${tenseTips[props.tense] || ''} ${formTips[props.form] || ''}`
})
</script>
