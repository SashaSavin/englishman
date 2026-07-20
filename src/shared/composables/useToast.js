import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  function add(message, { type = 'info', duration = 4000 } = {}) {
    const id = ++nextId
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }

  function remove(id) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx > -1) toasts.value.splice(idx, 1)
  }

  return {
    toasts,
    add,
    remove,
    success: (message, opts) => add(message, { ...opts, type: 'success' }),
    error: (message, opts) => add(message, { ...opts, type: 'error' }),
    warning: (message, opts) => add(message, { ...opts, type: 'warning' }),
    info: (message, opts) => add(message, { ...opts, type: 'info' }),
  }
}
