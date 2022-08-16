import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './MainTab';
import { RootStackParamList } from './types';
import {
  ArticleScreen,
  LoginScreen,
  MyArticlesScreen,
  RegisterScreen,
} from './screens';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';

const { Navigator, Screen } =
  createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  useAuthLoadEffect();

  return (
    <Navigator screenOptions={{ headerBackTitle: '닫기' }}>
      <Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />

      <Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: '회원가입' }}
      />
      <Screen
        name="Login"
        component={LoginScreen}
        options={{ title: '로그인' }}
      />
      <Screen
        name="MyArticles"
        component={MyArticlesScreen}
        options={{ title: '내가 쓴 글' }}
      />
      <Screen
        name="Article"
        component={ArticleScreen}
        options={{ title: '게시글' }}
      />
    </Navigator>
  );
}

export default memo(RootStack);
