import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/routes/MainTab';

const queryClient = new QueryClient();

export default () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" backgroundColor="#15141f" />
        <MainTab />
      </QueryClientProvider>
    </NavigationContainer>
  );
};
