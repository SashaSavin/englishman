<template>
  <button
    @click="toggle"
    class="text-lg leading-none p-1.5 rounded-dc bg-gray-100 dark:bg-dc-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
import { useTheme } from '../shared/composables/useTheme.js'

const { isDark, toggle } = useTheme()
</script>
