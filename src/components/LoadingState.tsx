import { ActivityIndicator, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
      <Text style={styles.message}>{message ?? t('loading.default')}</Text>
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
  message: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
}));
