<template>
  <div>
    <div class="flex items-start justify-between gap-3 mb-8">
      <p class="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
        <span v-for="(part, i) in sentenceParts" :key="i">
          <span v-if="part === '___'" class="inline-block border-b-2 border-dashed border-brand dark:border-brand-muted min-w-[4rem] text-brand dark:text-brand-muted font-bold px-1">???</span>
          <span v-else>{{ part }}</span>
        </span>
      </p>
      <button
        @click="$emit('toggle-bookmark', question.id)"
        class="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        :title="bookmarked ? 'Remove bookmark' : 'Add bookmark'"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" :fill="bookmarked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          :class="bookmarked ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    </div>
    <div class="space-y-3">
      <button
        v-for="opt in shuffledOptions" :key="opt"
        @click="$emit('select', opt)"
        :disabled="selected !== null"
        class="w-full text-left px-5 py-3.5 rounded-dc border-2 transition-all duration-200 font-medium"
        :class="optionClass(opt)"
      >{{ opt }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: Object,
  selected: String,
  shuffledOptions: Array,
  bookmarked: Boolean,
})

defineEmits(['select', 'toggle-bookmark'])

const sentenceParts = computed(() => props.question.sentence.split(/(___)/))

function optionClass(opt) {
  if (props.selected === null) {
    return 'border-gray-200 dark:border-gray-600 hover:border-brand hover:bg-brand/5 dark:hover:bg-brand/10 text-gray-700 dark:text-gray-200 dark:hover:text-gray-100'
  }
  if (opt === props.question.answer) {
    return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
  }
  if (opt === props.selected) {
    return 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  }
  return 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600'
}
</script>
