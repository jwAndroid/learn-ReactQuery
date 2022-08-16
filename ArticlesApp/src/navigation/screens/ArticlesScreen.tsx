import React, { memo, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import { getArticles } from '../../api/articles';
import { Article } from '../../api/type';
import { Articles } from '../../components';
import { useUserState } from '../../contexts/UserContext';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

function ArticlesScreen() {
  // const { data } = useQuery('articles', getArticles);
  // 그냥 불러올때

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({ pageParam }) => getArticles({ ...pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10
          ? { cursor: lastPage[lastPage.length - 1].id }
          : undefined,
      getPreviousPageParam: (_, allPlages) => {
        const validPage = allPlages.find((page) => page.length > 0);

        if (!validPage) {
          return undefined;
        }

        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }

    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  const [user] = useUserState();

  if (!items) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return (
    <Articles
      articles={items}
      showWriteButton={!!user}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refresh={fetchPreviousPage}
      isRefreshing={isFetchingPreviousPage}
    />
  );
}

export default memo(ArticlesScreen);
