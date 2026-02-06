import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { GitHubRepository } from '../../../shared/types/github';

interface RepoCardProps {
  repository: GitHubRepository;
  onPress: (repository: GitHubRepository) => void;
  style?: StyleProp<ViewStyle>;
}

export function RepoCard({ repository, onPress, style }: RepoCardProps) {
  const { t } = useTranslation();

  const handlePress = () => {
    onPress(repository);
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Image
        source={{ uri: repository.owner.avatar_url }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {repository.full_name}
        </Text>
        {repository.description && (
          <Text style={styles.description} numberOfLines={2}>
            {repository.description}
          </Text>
        )}
        <View style={styles.meta}>
          <Text style={styles.metaText}>
            {t('repo.stars', { count: repository.stargazers_count })}
          </Text>
          {repository.language && (
            <Text style={styles.metaText}>{repository.language}</Text>
          )}
          <Text style={styles.metaText}>
            {t('repo.updated', {
              date: new Date(repository.updated_at).toLocaleDateString(),
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  meta: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
}));
