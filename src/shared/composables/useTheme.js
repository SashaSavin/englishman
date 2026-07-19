import { ref } from 'vue'

const THEME_KEY = 'engl-theme'

const isDark = ref(true)

export function useTheme() {
  function init() {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      isDark.value = saved !== 'light'
    } catch {}
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    try { localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light') } catch {}
  }

  return { isDark, init, toggle }
}
