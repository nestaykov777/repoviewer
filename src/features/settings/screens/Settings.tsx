import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { ThemeMode } from '../../../shared/theme/helpers';
import { Language, useSettingsStore } from '../store/useSettingsStore';

export function Settings() {
  const { t } = useTranslation();
  const { language, themeMode, setLanguage, setThemeMode } = useSettingsStore();

  const languageOptions: { value: Language; label: string }[] = [
    { value: 'en', label: t('settings.languageEn') },
    { value: 'uk', label: t('settings.languageUk') },
  ];

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: t('settings.themeLight') },
    { value: 'dark', label: t('settings.themeDark') },
    { value: 'auto', label: t('settings.themeAuto') },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
      <View style={styles.segmentedControl}>
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              language === option.value && styles.segmentActive,
            ]}
            onPress={() => setLanguage(option.value)}
          >
            <Text
              style={[
                styles.segmentText,
                language === option.value && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t('settings.theme')}</Text>
      <View style={styles.segmentedControl}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              themeMode === option.value && styles.segmentActive,
            ]}
            onPress={() => setThemeMode(option.value)}
          >
            <Text
              style={[
                styles.segmentText,
                themeMode === option.value && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 24,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: theme.colors.primary,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text,
  },
  segmentTextActive: {
    color: '#ffffff',
  },
}));
