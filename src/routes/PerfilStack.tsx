import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieItem } from '../pages/MovieItem';
import { Perfil } from '../pages/Perfil';
import { Favorites } from '../pages/Favorites';
import { UserPerfil } from '../pages/UserPerfil';

export type RootPerfilStackProps = {
  Perfil: undefined;
  Favorites: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
  UserPerfil: undefined;
  //Configs: undefined;
};

const Stack = createStackNavigator<RootPerfilStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="MovieItem" component={MovieItem} />
      <Stack.Screen name="UserPerfil" component={UserPerfil} />
    </Stack.Navigator>
  );
};
