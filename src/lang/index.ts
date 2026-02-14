import { createI18n } from 'vue-i18n'
import en from '@/lang/locales/en.json'

export const i18n = createI18n({
  legacy: false, // IMPORTANT for Composition API
  globalInjection: true, // 👈 enables $t everywhere
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})

export type MessageSchema = typeof en
