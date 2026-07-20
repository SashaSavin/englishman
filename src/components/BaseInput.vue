<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :autocomplete="autocomplete"
    :required="required"
    class="w-full rounded-dc bg-white dark:bg-dc-input text-gray-800 dark:text-dc-text-normal placeholder:text-gray-400 dark:placeholder:text-dc-text-muted border outline-none transition-colors"
    :class="error
      ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
      : 'border-gray-300 dark:border-dc-border focus:border-brand focus:ring-1 focus:ring-brand'"
    :style="{ padding: size === 'sm' ? '6px 10px' : size === 'lg' ? '12px 16px' : '10px 14px' }"
  />
  <p v-if="error" class="mt-1 text-xs text-red-400">{{ error }}</p>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: String,
  maxlength: [String, Number],
  autocomplete: { type: String, default: 'off' },
  required: Boolean,
  error: String,
  size: { type: String, default: 'md' },
})

defineEmits(['update:modelValue'])
</script>
