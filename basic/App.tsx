/**
 * @format
 */

import React, {memo} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Home from './src/screens/Home';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Home />
    </QueryClientProvider>
  );
};

export default memo(App);
