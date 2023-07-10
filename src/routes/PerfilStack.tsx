import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../pages/Home';
import { MovieItem } from '../pages/MovieItem';
import { Favorites } from '../pages/Favorites';

export type RootHomeStackProps = {
  Perfil: undefined;
  Favorites: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
  UserPerfil: undefined;
  Configs: undefined;
};

const Stack = createStackNavigator<RootHomeStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={Home} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="MovieItem" component={MovieItem} />
    </Stack.Navigator>
  );
};
