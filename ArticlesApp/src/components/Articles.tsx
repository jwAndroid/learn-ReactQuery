import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { Article } from '../api/type';
import ArticleItem from './ArticleItem';
import WriteButton from './WriteButton';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
  spinner: {
    backgroundColor: 'white',
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export interface ArticlesProps {
  articles: Article[];
  showWriteButton: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
}

function Articles({
  articles,
  showWriteButton,
  isFetchingNextPage,
  fetchNextPage,
}: ArticlesProps) {
  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() =>
        showWriteButton ? <WriteButton /> : null
      }
      ListFooterComponent={() => (
        <>
          <View style={styles.separator} />
          {isFetchingNextPage && (
            <ActivityIndicator
              size="large"
              color="black"
              style={styles.spinner}
            />
          )}
        </>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
    />
  );
}

export default memo(Articles);
