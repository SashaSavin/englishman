import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

const LOCALE_KEY = 'engl-locale'

function getInitialLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {}
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: { en, ru },
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  try { localStorage.setItem(LOCALE_KEY, locale) } catch {}
}

export default i18n
