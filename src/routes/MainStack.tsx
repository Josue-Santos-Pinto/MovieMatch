import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import AuthStack from './AuthStack';
import { Splash } from '../pages/Splash';

export type RootMainStackProps = {
  Splash: undefined;
  MainTab: undefined;
  AuthStack: undefined;
};

const Stack = createStackNavigator<RootMainStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};
