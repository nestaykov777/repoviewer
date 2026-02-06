import i18n from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Language } from '../../../shared/i18n';
import { mmkvStorage } from '../../../shared/storage/mmkv';
import { setAppTheme, ThemeMode } from '../../../shared/theme/helpers';
export type { Language };

interface SettingsState {
  language: Language;
  themeMode: ThemeMode;
  setLanguage: (language: Language) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
}

// Persisted via MMKV so preferences survive app restarts
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: (i18n.language as Language) || 'en',
      themeMode: 'auto',
      setLanguage: (language: Language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
      setThemeMode: (themeMode: ThemeMode) => {
        setAppTheme(themeMode);
        set({ themeMode });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
