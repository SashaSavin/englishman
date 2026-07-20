<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-semibold rounded-dc transition-colors outline-none focus:ring-1 focus:ring-brand"
    :class="[sizeClass, variantClass]"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <svg v-if="disabled && !loading" class="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: Boolean,
  loading: Boolean,
  type: { type: String, default: 'button' },
})

const sizeClass = computed(() => ({
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}[props.size]))

const variantClass = computed(() => {
  if (props.disabled || props.loading) {
    return 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-transparent'
  }
  switch (props.variant) {
    case 'primary':
      return 'bg-brand text-white hover:bg-brand-hover'
    case 'secondary':
      return 'bg-white dark:bg-dc-surface text-gray-700 dark:text-dc-text border border-gray-200 dark:border-dc-border hover:bg-gray-50 dark:hover:bg-dc-hover'
    case 'ghost':
      return 'bg-transparent text-gray-600 dark:text-dc-text-muted hover:bg-gray-100 dark:hover:bg-dc-hover'
    default:
      return 'bg-brand text-white hover:bg-brand-hover'
  }
})
</script>
