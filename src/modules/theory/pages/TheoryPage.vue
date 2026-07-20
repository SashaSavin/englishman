<template>
  <div>
    <button @click="goBack" class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-6">
      {{ $t('theory.back') }}
    </button>

    <div class="space-y-8">
      <section v-for="tense in tenses" :key="tense.key" class="bg-white dark:bg-dc-surface rounded-dc-md shadow-md p-6 md:p-8">
        <h2 class="text-2xl font-extrabold mb-1" :class="tense.titleColor">{{ tense.name }}</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-4">{{ tense.usage }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
          {{ $t('theory.signalWords') }}: <span class="font-medium text-gray-700 dark:text-gray-300">{{ tense.signals }}</span>
        </p>

        <div class="space-y-5">
          <div v-for="form in tense.forms" :key="form.type" class="border-l-4 pl-4" :class="form.border">
            <p class="font-semibold text-sm mb-1" :class="form.labelClass">{{ form.label }}</p>
            <p class="text-gray-700 dark:text-gray-300 font-mono text-sm mb-2">{{ form.structure }}</p>
            <ul class="space-y-1">
              <li v-for="(ex, i) in form.examples" :key="i" class="text-gray-600 dark:text-gray-400 text-sm">{{ ex }}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const tenses = computed(() => [
  {
    key: 'present-simple', name: t('theory.present.name'), titleColor: 'text-blue-700 dark:text-blue-400',
    usage: t('theory.present.usage'),
    signals: t('theory.present.signals'),
    forms: [
      { type: 'affirmative', label: t('theory.present.aff.label'), border: 'border-green-500', labelClass: 'text-green-700 dark:text-green-400', structure: t('theory.present.aff.structure'), examples: [t('theory.present.aff.ex1'), t('theory.present.aff.ex2'), t('theory.present.aff.extra1'), t('theory.present.aff.extra2'), t('theory.present.aff.extra3')] },
      { type: 'negative', label: t('theory.present.neg.label'), border: 'border-red-500', labelClass: 'text-red-700 dark:text-red-400', structure: t('theory.present.neg.structure'), examples: [t('theory.present.neg.ex1'), t('theory.present.neg.ex2'), t('theory.present.neg.extra1'), t('theory.present.neg.extra2'), t('theory.present.neg.extra3')] },
      { type: 'question', label: t('theory.present.ques.label'), border: 'border-amber-500', labelClass: 'text-amber-700 dark:text-amber-400', structure: t('theory.present.ques.structure'), examples: [t('theory.present.ques.ex1'), t('theory.present.ques.ex2'), t('theory.present.ques.extra1'), t('theory.present.ques.extra2'), t('theory.present.ques.extra3')] },
    ],
  },
  {
    key: 'past-simple', name: t('theory.past.name'), titleColor: 'text-purple-700 dark:text-purple-400',
    usage: t('theory.past.usage'),
    signals: t('theory.past.signals'),
    forms: [
      { type: 'affirmative', label: t('theory.past.aff.label'), border: 'border-green-500', labelClass: 'text-green-700 dark:text-green-400', structure: t('theory.past.aff.structure'), examples: [t('theory.past.aff.ex1'), t('theory.past.aff.ex2'), t('theory.past.aff.extra1'), t('theory.past.aff.extra2'), t('theory.past.aff.extra3')] },
      { type: 'negative', label: t('theory.past.neg.label'), border: 'border-red-500', labelClass: 'text-red-700 dark:text-red-400', structure: t('theory.past.neg.structure'), examples: [t('theory.past.neg.ex1'), t('theory.past.neg.ex2'), t('theory.past.neg.extra1'), t('theory.past.neg.extra2'), t('theory.past.neg.extra3')] },
      { type: 'question', label: t('theory.past.ques.label'), border: 'border-amber-500', labelClass: 'text-amber-700 dark:text-amber-400', structure: t('theory.past.ques.structure'), examples: [t('theory.past.ques.ex1'), t('theory.past.ques.ex2'), t('theory.past.ques.extra1'), t('theory.past.ques.extra2'), t('theory.past.ques.extra3')] },
    ],
  },
  {
    key: 'future-simple', name: t('theory.future.name'), titleColor: 'text-emerald-700 dark:text-emerald-400',
    usage: t('theory.future.usage'),
    signals: t('theory.future.signals'),
    forms: [
      { type: 'affirmative', label: t('theory.future.aff.label'), border: 'border-green-500', labelClass: 'text-green-700 dark:text-green-400', structure: t('theory.future.aff.structure'), examples: [t('theory.future.aff.ex1'), t('theory.future.aff.ex2'), t('theory.future.aff.extra1'), t('theory.future.aff.extra2'), t('theory.future.aff.extra3')] },
      { type: 'negative', label: t('theory.future.neg.label'), border: 'border-red-500', labelClass: 'text-red-700 dark:text-red-400', structure: t('theory.future.neg.structure'), examples: [t('theory.future.neg.ex1'), t('theory.future.neg.ex2'), t('theory.future.neg.extra1'), t('theory.future.neg.extra2'), t('theory.future.neg.extra3')] },
      { type: 'question', label: t('theory.future.ques.label'), border: 'border-amber-500', labelClass: 'text-amber-700 dark:text-amber-400', structure: t('theory.future.ques.structure'), examples: [t('theory.future.ques.ex1'), t('theory.future.ques.ex2'), t('theory.future.ques.extra1'), t('theory.future.ques.extra2'), t('theory.future.ques.extra3')] },
    ],
  },
])
</script>
