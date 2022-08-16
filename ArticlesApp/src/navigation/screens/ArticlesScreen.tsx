import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { getArticles } from '../../api/articles';
import { Articles } from '../../components';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

function ArticlesScreen() {
  const { data } = useQuery('articles', getArticles);

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return <Articles articles={data} />;
}

export default memo(ArticlesScreen);
