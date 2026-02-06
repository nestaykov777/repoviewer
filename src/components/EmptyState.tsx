import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

interface EmptyStateProps {
  type: 'initial' | 'noResults';
}

export function EmptyState({ type }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'initial'
          ? t('search.initialTitle')
          : t('search.noResultsTitle')}
      </Text>
      <Text style={styles.subtitle}>
        {type === 'initial'
          ? t('search.initialSubtitle')
          : t('search.noResultsSubtitle')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}));
