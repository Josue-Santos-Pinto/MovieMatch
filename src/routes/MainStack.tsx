import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import AuthStack from './AuthStack';

export type RootMainStackProps = {
  MainTab: undefined;
  AuthStack: undefined;
};

const Stack = createStackNavigator<RootMainStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
      {/*<Stack.Screen name="Splash" component={Login} />*/}
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};
