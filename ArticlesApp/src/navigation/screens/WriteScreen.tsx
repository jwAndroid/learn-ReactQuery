import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from 'react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { modifyArticle, writeArticle } from '../../api/articles';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '../types';
import { Article } from '../../api/type';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
    margin: 10,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

function WriteScreen() {
  const { params } = useRoute<WriteScreenRouteProp>();

  const navigation = useNavigation<RootStackNavigationProp>();

  const queryClient = useQueryClient();

  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData<Article>([
            'article',
            params.articleId,
          ])
        : null,
    [queryClient, params.articleId],
  );

  const { top } = useSafeAreaInsets();
  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [body, setBody] = useState(cachedArticle?.body ?? '');

  // notion: react-query
  const { mutate: write } = useMutation(writeArticle, {
    onSuccess: (article) => {
      queryClient.setQueryData<InfiniteData<Article[]>>(
        'articles',
        (data) => {
          if (!data) {
            return {
              pageParams: [undefined],
              pages: [[article]],
            };
          }
          const [firstPage, ...rest] = data.pages;

          return {
            ...data,

            pages: [[article, ...firstPage], ...rest],
          };
        },
      );

      navigation.goBack();
    },
  });
  // 페이지네이션을 추가했을때 쓰고나서 당연히 이전 스크린에 업데이트 되어야한다.
  // 해당하는 작업을 위에서 처리해준건데 .. 번거롭기때문에 invalidate 하여 재요청하는게 더 편할수있다.

  const { mutate: modify } = useMutation(modifyArticle, {
    onSuccess: (article) => {
      queryClient.setQueryData<InfiniteData<Article[]>>(
        'articles',
        (data) => {
          if (!data) {
            return { pageParams: [], pages: [] };
          }

          return {
            pageParams: data!.pageParams,
            pages: data!.pages.map((page) =>
              page.find((a) => a.id === params.articleId)
                ? page.map((a) =>
                    a.id === params.articleId ? article : a,
                  )
                : page,
            ),
          };
        },
      );

      queryClient.setQueryData(
        ['article', params.articleId],
        article,
      );

      navigation.goBack();
    },
  });

  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({ id: params.articleId, title, body });
    } else {
      write({ title, body });
    }
  }, [body, modify, params.articleId, title, write]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={onSubmit}
          style={({ pressed }) =>
            pressed && styles.headerRightPressed
          }
        >
          <MaterialIcons name="send" size={24} color="#2196f3" />
        </Pressable>
      ),
    });
  }, [navigation, onSubmit]);

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ ios: 'padding' })}
        keyboardVerticalOffset={Platform.select({ ios: top + 60 })}
      >
        <TextInput
          placeholder="title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="contents"
          style={[styles.input, styles.body]}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default WriteScreen;
