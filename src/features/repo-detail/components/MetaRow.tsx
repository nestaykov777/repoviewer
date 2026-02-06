import { Text, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

type Props = {
  label: string;
  value: string;
};

export function MetaRow({ label, value }: Props) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  metaLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
}));
