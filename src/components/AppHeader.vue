<template>
  <header class="lg:hidden bg-transparent">
    <div class="px-4 h-14 flex items-center justify-between">
      <button
        v-if="route.name !== 'setup'"
        @click="router.push('/')"
        class="text-lg font-bold tracking-tight text-brand dark:text-brand-muted"
      >
        Englishman
      </button>
      <span v-else class="text-lg font-bold tracking-tight text-brand dark:text-brand-muted">
        Englishman
      </span>

      <div class="flex items-center gap-2">
        <button
          @click="toggleLocale"
          class="text-xs font-semibold px-2 py-1 rounded-dc border border-gray-300 dark:border-dc-border text-gray-500 dark:text-dc-text-muted hover:border-brand hover:text-brand dark:hover:text-brand-muted transition-colors"
        >
          {{ locale === 'en' ? 'RU' : 'EN' }}
        </button>
        <button
          @click="toggleTheme"
          class="text-lg leading-none p-1.5 rounded-dc bg-gray-100 dark:bg-dc-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" class="w-4 h-4" stroke-width="1.5" />
          <Moon v-else class="w-4 h-4" stroke-width="1.5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../shared/composables/useTheme.js'
import { Sun, Moon } from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const { isDark, toggle: toggleTheme } = useTheme()

function toggleLocale() {
  const next = locale.value === 'en' ? 'ru' : 'en'
  locale.value = next
  try { localStorage.setItem('engl-locale', next) } catch {}
}
</script>
