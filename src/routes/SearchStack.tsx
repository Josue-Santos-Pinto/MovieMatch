import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieItem } from '../pages/MovieItem';
import { Search } from '../pages/Search';

export type RootSearchStackProps = {
  Search: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
};

const Stack = createStackNavigator<RootSearchStackProps>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MovieItem" component={MovieItem} />
    </Stack.Navigator>
  );
};
