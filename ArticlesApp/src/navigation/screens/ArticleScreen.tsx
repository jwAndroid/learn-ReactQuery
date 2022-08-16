import React, { memo } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RouteProp, useRoute } from '@react-navigation/core';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { getArticle } from '../../api/articles';
import { deleteComment, getComments } from '../../api/comments';
import {
  ArticleView,
  CommentInput,
  CommentItem,
} from '../../components';
import { useUserState } from '../../contexts/UserContext';
import { Comment } from '../../api/type';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

type ArticleScreenRouteProp = RouteProp<
  RootStackParamList,
  'Article'
>;

function ArticleScreen() {
  const { params } = useRoute<ArticleScreenRouteProp>();
  const { id } = params;
  const [currentUser] = useUserState();

  const { bottom } = useSafeAreaInsets();

  const queryClient = useQueryClient();

  const articleQuery = useQuery(['article', id], () =>
    getArticle(id),
  );

  const commentsQuery = useQuery(['comments', id], () =>
    getComments(id),
  );

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator
        size="large"
        style={styles.spinner}
        color="black"
      />
    );
  }

  const { title, body, published_at, user } = articleQuery.data;
  const isMyArticle = currentUser?.id === user.id;

  const onRemove = () => {};

  const onModify = () => {};

  return (
    <FlatList
      style={styles.flatList}
      data={commentsQuery.data}
      contentContainerStyle={[
        styles.flatListContent,
        { paddingBottom: bottom },
      ]}
      renderItem={({ item }) => (
        <CommentItem
          id={item.id}
          message={item.message}
          publishedAt={item.published_at}
          username={item.user.username}
          onRemove={onRemove}
          onModify={onModify}
          isMyComment={item.user.id === currentUser?.id}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <>
          <ArticleView
            title={title}
            body={body}
            publishedAt={published_at}
            username={user.username}
            id={id}
            isMyArticle={isMyArticle}
          />
          <CommentInput articleId={id} />
        </>
      )}
    />
  );
}

export default memo(ArticleScreen);
