import { Text, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

interface StatBadgeProps {
  label: string;
  value: number;
}

export function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value.toLocaleString()}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
}));
