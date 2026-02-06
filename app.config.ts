import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'repoviewer',
  slug: 'repoviewer',
  version: '1.0.0',
  orientation: 'default',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  scheme: 'repoviewer',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.repoviewer',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.repoviewer',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-asset',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        image: './assets/splash-icon.png',
      },
    ],
    'react-native-edge-to-edge',
    'expo-localization',
  ],
  extra: {
    uri: process.env.URI,
    eas: {
      projectId: '723b8c0c-08e1-4c87-b228-6d193c4d0b8b',
    },
  },
});
