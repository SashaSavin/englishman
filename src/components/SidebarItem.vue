<template>
  <button
    class="flex items-center gap-3 w-full rounded-dc transition-colors text-sm"
    :class="active
      ? 'bg-brand/10 dark:bg-brand/15 text-brand dark:text-brand-muted'
      : 'text-gray-500 dark:text-dc-text-muted hover:bg-gray-100 dark:hover:bg-dc-hover hover:text-gray-700 dark:hover:text-dc-text-normal'"
    :style="{ padding: expanded ? '8px 10px' : '8px' }"
  >
    <component :is="iconComponent" class="flex-shrink-0 w-5 h-5" stroke-width="1.5" />
    <span v-if="expanded" class="truncate">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { Home, BookOpen, BarChart3, Swords, Sun, Moon, Globe, Circle } from '@lucide/vue'

const props = defineProps({
  icon: String,
  label: String,
  expanded: Boolean,
  active: Boolean,
})

const map = {
  home: Home,
  theory: BookOpen,
  activity: BarChart3,
  game: Swords,
  sun: Sun,
  moon: Moon,
  globe: Globe,
}

const iconComponent = computed(() => map[props.icon] || Circle)
</script>
