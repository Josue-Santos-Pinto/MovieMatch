import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Perfil } from '../pages/Perfil';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export type RootPerfilStackProps = {
  Perfil: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootPerfilStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
