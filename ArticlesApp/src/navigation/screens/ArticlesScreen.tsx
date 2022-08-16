import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { getArticles } from '../../api/articles';
import { Articles } from '../../components';
import { useUserState } from '../../contexts/UserContext';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

function ArticlesScreen() {
  const { data } = useQuery('articles', getArticles);

  const [user] = useUserState();

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return <Articles articles={data} showWriteButton={!!user} />;
}

export default memo(ArticlesScreen);
