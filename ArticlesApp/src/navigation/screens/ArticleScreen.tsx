import React, { memo, useState } from 'react';
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
import AskDialog from '../../components/AskDialog';

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
  const [selectedCommentId, setSelectedCommentId] = useState<
    number | null
  >(null);

  const [askRemoveComment, setAskRemoveComment] = useState(false);

  const queryClient = useQueryClient();

  const { params } = useRoute<ArticleScreenRouteProp>();
  const { id } = params;
  const [currentUser] = useUserState();

  const { bottom } = useSafeAreaInsets();

  const { mutate: remove } = useMutation(deleteComment, {
    // deleteComment api 실행
    onSuccess: () => {
      // DELTE 메소드를 사용하기 때문에 에러가 아닌이상 없다.
      queryClient.setQueryData<Comment[]>(
        // setQueryData 로 상태변경
        ['comments', id],
        // 캐시키 주입, api 파라미터에 들어갈 id 준비
        (comments) =>
          // 원래 store 에 존재하는 comments 를 모두 조회
          comments
            ? comments.filter((c) => c.id !== selectedCommentId)
            : // 원래있던 커맨트와 뽑은 커맨트의 id 를 비교해서 아닌 뽑은것 제외하고
              // 새로운 배열상태를 업데이터 함수를 사용하여 업데이트
              [],
        // comments 가 falsy 하면 빈배열을 업데이트
      );
    },
  });

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

  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };

  const onModify = (commentId: number) => {
    setAskRemoveComment(true);
  };

  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({ id: selectedCommentId!, articleId: id });
    // api 자체가 articleId 를 요구하고 있다.
  };

  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };

  return (
    <>
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
      <AskDialog
        visible={askRemoveComment}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
    </>
  );
}

export default memo(ArticleScreen);
