import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage } from '../storage/mmkv';
import en from './locales/en.json';
import uk from './locales/uk.json';

export const SUPPORTED_LANGUAGES = ['en', 'uk'];
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(value: unknown): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

function getInitialLanguage(): Language {
  const raw = storage.getString('settings-storage');
  if (raw) {
    try {
      const lang = (JSON.parse(raw) as { state?: { language?: string } })?.state
        ?.language;
      if (isSupportedLanguage(lang)) return lang;
    } catch (error) {
      console.warn('Failed to parse settings-storage:', error);
    }
  }
  const deviceLang = getLocales()[0]?.languageCode;
  return isSupportedLanguage(deviceLang) ? deviceLang : 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
