import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { writeArticle } from '../../api/articles';
import { RootStackNavigationProp } from '../types';
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

function WriteScreen() {
  const { top } = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigation = useNavigation<RootStackNavigationProp>();

  const queryClient = useQueryClient();

  // notion: react-query
  const { mutate: write } = useMutation(writeArticle, {
    onSuccess: (article) => {
      // queryClient.invalidateQueries('articles');

      // const articles =
      //   queryClient.getQueryData<Article[]>('articles') ?? [];

      // queryClient.setQueryData('articles', articles.concat(article));

      queryClient.setQueryData<Article[]>('articles', (articles) =>
        (articles ?? []).concat(article),
      );

      navigation.goBack();
    },
  });

  const onSubmit = useCallback(() => {
    write({ title, body });
  }, [body, title, write]);

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
