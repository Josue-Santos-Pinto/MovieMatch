import React from 'react';
import { Home } from './src/pages/Home';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};
