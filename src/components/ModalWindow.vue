<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" @click.self="close">
      <div class="relative bg-white dark:bg-dc-surface rounded-dc-md shadow-xl p-6 w-full max-w-sm mx-4 transition-colors">
        <button @click="close" class="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-600">
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
function close() { emit('update:modelValue', false) }
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
