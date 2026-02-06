import { StyleSheet } from 'react-native-unistyles';

import { ThemeMode } from './helpers';
import { storage } from '../storage/mmkv';

const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007AFF',
    secondary: '#5856D6',
    border: '#D8D8D8',
    card: '#F2F2F7',
    textSecondary: '#6B7280',
    error: '#FF3B30',
    success: '#34C759',
    skeleton: '#E5E7EB',
  },
};

const darkTheme = {
  colors: {
    background: '#000000',
    text: '#ffffff',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    border: '#38383A',
    card: '#1C1C1E',
    textSecondary: '#9CA3AF',
    error: '#FF453A',
    success: '#30D158',
    skeleton: '#2C2C2E',
  },
};

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

function getPersistedThemeMode(): ThemeMode {
  const raw = storage.getString('settings-storage');
  if (!raw) return 'auto';
  try {
    const parsed = JSON.parse(raw) as { state?: { themeMode?: string } };
    const mode = parsed?.state?.themeMode;
    if (mode === 'light' || mode === 'dark') return mode;
  } catch {
    // ignore parse errors
  }
  return 'auto';
}

const initialMode = getPersistedThemeMode();

if (initialMode === 'auto') {
  StyleSheet.configure({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    settings: {
      adaptiveThemes: true,
    },
  });
} else {
  StyleSheet.configure({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    settings: {
      initialTheme: initialMode,
    },
  });
}
