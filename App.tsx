import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import MainStack from './src/routes/MainStack';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

export default () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
};
