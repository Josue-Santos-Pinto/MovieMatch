import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export type RootAuthStackProps = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootAuthStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
