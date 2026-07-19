<template>
  <button
    class="flex flex-col items-center gap-0.5 py-1 px-2 transition-colors min-w-0"
    :class="active
      ? 'text-brand dark:text-brand-muted'
      : 'text-gray-400 dark:text-dc-text-muted hover:text-gray-600 dark:hover:text-dc-text-normal'"
  >
    <component :is="iconComponent" class="w-5 h-5" stroke-width="1.5" />
    <span class="text-[10px] font-medium leading-none truncate max-w-full">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { Home, BookOpen, BarChart3, Swords } from '@lucide/vue'

const props = defineProps({
  icon: String,
  label: String,
  active: Boolean,
})

const map = { home: Home, theory: BookOpen, activity: BarChart3, game: Swords }

const iconComponent = computed(() => map[props.icon])
</script>
