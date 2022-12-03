/**
 * @format
 */

import React, { memo } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@emotion/react';

import { RootStack } from './src/navigation';
import theme from './src/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default memo(App);

// TODO: 리액트쿼리를 사용한 전역적 데이터 상태관리
// - 원시타입 데이터
// - 배열타입 데이터
// - 객체 데이터

// TODO: 리액트 쿼리를 사용한 서버상태 통신
// - 캐시타임
