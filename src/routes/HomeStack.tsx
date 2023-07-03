import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../pages/Home';
import { MovieItem } from '../pages/MovieItem';
import { Search } from '../pages/Search';

export type RootHomeStackProps = {
  Home: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
};

const Stack = createStackNavigator<RootHomeStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MovieItem" component={MovieItem} />
    </Stack.Navigator>
  );
};
