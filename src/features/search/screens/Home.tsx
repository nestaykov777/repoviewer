import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useNetworkStatus } from '../../../shared/hooks/useNetworkStatus';
import { GitHubRepository } from '../../../shared/types/github';
import { EmptyState } from '../components/EmptyState';
import { RepoCard } from '../components/RepoCard';
import { SearchBar } from '../components/SearchBar';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { useSearchRepos } from '../hooks/useSearchRepos';

export function Home() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isConnected } = useNetworkStatus();
  const { query, debouncedQuery, setQuery, clearSearch } = useDebouncedSearch();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSearchRepos(debouncedQuery);

  const repositories = data?.pages.flatMap((page) => page.items) ?? [];

  const handleRepoPress = (repository: GitHubRepository) => {
    navigation.navigate('RepoDetail', {
      owner: repository.owner.login,
      repo: repository.name,
    });
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderContent = () => {
    if (!isConnected && query.length === 0) {
      return <ErrorState message={t('error.noInternet')} onRetry={refetch} />;
    }

    if (!debouncedQuery) {
      return <EmptyState type="initial" />;
    }

    if (isLoading && !isFetchingNextPage) {
      return <LoadingState />;
    }

    if (isError) {
      return <ErrorState message={error?.message} onRetry={refetch} />;
    }

    if (repositories.length === 0) {
      return <EmptyState type="noResults" />;
    }

    return (
      <FlashList
        data={repositories}
        renderItem={({ item, index }) => (
          <RepoCard
            repository={item}
            onPress={handleRepoPress}
            style={index === 0 ? styles?.repoCard : undefined}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <LoadingState /> : null}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} onClear={clearSearch} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  repoCard: {
    paddingTop: 24,
  },
}));
