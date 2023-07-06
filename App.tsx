import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/routes/MainStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const queryClient = new QueryClient();

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle="light-content" backgroundColor="#15141f" />
          <MainStack />
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
};
