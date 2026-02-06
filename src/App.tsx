import './theme/unistyles';
import './i18n';

import * as React from 'react';
import { useColorScheme } from 'react-native';

import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import { useNetworkStatus } from './hooks/useNetworkStatus';
import { Navigation } from './navigation';
import { useSettingsStore } from './store/useSettingsStore';

const queryClient = new QueryClient();

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/feed.png'),
  require('./assets/gear.png'),
]);

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 350,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {
  useTranslation();
  useNetworkStatus();
  const systemColorScheme = useColorScheme();
  const themeMode = useSettingsStore((state) => state.themeMode);

  const effectiveScheme = themeMode === 'auto' ? systemColorScheme : themeMode;
  const theme = effectiveScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation
            theme={theme}
            linking={{
              prefixes: [prefix],
              config: {
                screens: {
                  RepoDetail: 'repo/:owner/:repo',
                  NotFound: '*',
                },
              },
            }}
            onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
          <Toaster />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
