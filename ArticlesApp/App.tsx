/**
 * @format
 */

import React, { memo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './src/navigation';
import { UserContextProvider } from './src/contexts/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default memo(App);
