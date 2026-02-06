import { UnistylesRuntime } from 'react-native-unistyles';

export type ThemeMode = 'light' | 'dark' | 'auto';

export function setAppTheme(mode: ThemeMode) {
  if (mode === 'auto') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(mode);
  }
}
