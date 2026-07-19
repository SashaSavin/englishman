<template>
    <ModalWindow :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <h3 class="text-lg font-extrabold mb-5">{{ $t('settings.title') }}</h3>

    <div class="mb-5">
      <p class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{{ $t('settings.questionCount') }}</p>
      <div class="flex gap-2">
        <button
          v-for="n in [5, 10, 15]" :key="n"
          @click="$emit('update:questionCount', n)"
          class="flex-1 py-2.5 rounded-dc text-sm font-semibold transition-all"
          :class="questionCount === n ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >{{ n }}</button>
      </div>
    </div>

    <div class="mb-5">
      <p class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{{ $t('settings.timerLabel') }}</p>
      <div class="flex gap-2">
        <button
          @click="$emit('update:timerEnabled', false)"
          class="flex-1 py-2.5 rounded-dc text-sm font-semibold transition-all"
          :class="!timerEnabled ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >{{ $t('settings.timerOff') }}</button>
        <button
          v-for="s in [10, 15, 20, 30]" :key="s"
          @click="$emit('update:timerEnabled', true); $emit('update:timerDuration', s)"
          class="flex-1 py-2.5 rounded-dc text-sm font-semibold transition-all"
          :class="timerEnabled && timerDuration === s ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >{{ $t('settings.timerSec', { n: s }) }}</button>
      </div>
    </div>
  </ModalWindow>
</template>

<script setup>
import ModalWindow from '../../../components/ModalWindow.vue'

defineProps({
  modelValue: Boolean,
  questionCount: Number,
  timerEnabled: Boolean,
  timerDuration: Number,
})

defineEmits(['update:modelValue', 'update:questionCount', 'update:timerEnabled', 'update:timerDuration'])
</script>
