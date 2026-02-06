import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StaticScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { MetaRow } from '../../components/MetaRow';
import { StatBadge } from '../../components/StatBadge';
import { useRepoDetails } from '../../hooks/useRepoDetails';

type Props = StaticScreenProps<{
  owner: string;
  repo: string;
}>;

export function RepoDetail({ route }: Props) {
  const { owner, repo } = route.params;
  const { t } = useTranslation();
  const {
    data: repository,
    isLoading,
    isError,
    error,
    refetch,
  } = useRepoDetails(owner, repo);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !repository) {
    return <ErrorState message={error?.message} onRetry={refetch} />;
  }

  const handleOpenInBrowser = () => {
    Linking.openURL(repository.html_url);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.ownerSection}>
        <Image
          source={{ uri: repository.owner.avatar_url }}
          style={styles.ownerAvatar}
        />
        <View>
          <Text style={styles.ownerName}>{repository.owner.login}</Text>
          <Text style={styles.ownerType}>{repository.owner.type}</Text>
        </View>
      </View>

      <Text style={styles.repoName}>{repository.name}</Text>
      {repository.description && (
        <Text style={styles.description}>{repository.description}</Text>
      )}

      <View style={styles.statsGrid}>
        <StatBadge
          label={t('repoDetail.stars')}
          value={repository?.stargazers_count ?? 0}
        />
        <StatBadge
          label={t('repoDetail.forks')}
          value={repository?.forks_count ?? 0}
        />
        <StatBadge
          label={t('repoDetail.issues')}
          value={repository?.open_issues_count ?? 0}
        />
      </View>

      <View style={styles.metaSection}>
        {repository.language && (
          <MetaRow
            label={t('repoDetail.language')}
            value={repository.language}
          />
        )}
        {repository.license && (
          <MetaRow
            label={t('repoDetail.license')}
            value={repository.license.name}
          />
        )}
        {repository.updated_at && (
          <MetaRow
            label={t('repoDetail.updated')}
            value={new Date(repository.updated_at).toLocaleDateString()}
          />
        )}
        {repository.created_at && (
          <MetaRow
            label={t('repoDetail.created')}
            value={new Date(repository.created_at).toLocaleDateString()}
          />
        )}
      </View>

      {repository.topics.length > 0 && (
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>{t('repoDetail.topics')}</Text>
          <View style={styles.topicsContainer}>
            {repository.topics.map((topic) => (
              <View key={topic} style={styles.topicBadge}>
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity onPress={handleOpenInBrowser} style={styles.openButton}>
        <Text style={styles.openButtonText}>
          {t('repoDetail.openInBrowser')}
        </Text>
      </TouchableOpacity>
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
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  ownerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  ownerType: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  repoName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  metaSection: {
    marginBottom: 20,
  },
  topicsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicBadge: {
    backgroundColor: `${theme.colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  openButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}));
