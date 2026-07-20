<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts" :key="t.id"
        class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-dc-md shadow-lg border-l-[3px] transition-all"
        :class="classes(t.type)"
      >
        <component :is="iconComponent(t.type)" :size="18" class="shrink-0 mt-0.5" />
        <p class="text-sm font-medium flex-1 min-w-0">{{ t.message }}</p>
        <button @click="remove(t.id)" class="shrink-0 opacity-40 hover:opacity-100 transition-opacity p-0.5 -m-0.5">
          <X :size="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { Check, X, AlertTriangle, Info } from '@lucide/vue'
import { useToast } from '../shared/composables/useToast.js'

const { toasts, remove } = useToast()

function iconComponent(type) {
  return { success: Check, error: X, warning: AlertTriangle, info: Info }[type] || Info
}

function classes(type) {
  const map = {
    success: 'bg-white dark:bg-dc-surface border-l-green-500 text-gray-800 dark:text-dc-text',
    error: 'bg-white dark:bg-dc-surface border-l-red-500 text-gray-800 dark:text-dc-text',
    warning: 'bg-white dark:bg-dc-surface border-l-yellow-500 text-gray-800 dark:text-dc-text',
    info: 'bg-white dark:bg-dc-surface border-l-brand text-gray-800 dark:text-dc-text',
  }
  return map[type] || map.info
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.25s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.toast-move {
  transition: transform 0.25s ease;
}
</style>
