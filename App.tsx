import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/routes/MainTab';

const queryClient = new QueryClient();

export default () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainTab />
      </QueryClientProvider>
    </NavigationContainer>
  );
};
