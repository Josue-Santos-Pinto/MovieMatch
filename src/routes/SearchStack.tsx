import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieItem } from '../pages/MovieItem';
import { Search } from '../pages/Search';

export type RootStackProps = {
  Search: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
};

const Stack = createStackNavigator<RootStackProps>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MovieItem" component={MovieItem} />
    </Stack.Navigator>
  );
};
