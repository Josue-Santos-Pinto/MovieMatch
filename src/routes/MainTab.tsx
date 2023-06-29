import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/Home';
import { MovieItem } from '../pages/MovieItem';
import { Search } from '../pages/Search';
import Icon from 'react-native-vector-icons/FontAwesome';

export type RootTabProps = {
  Home: undefined;
  MovieItem: {
    id: number;
  };
  Search: {
    query: string;
  };
};

const Tab = createBottomTabNavigator<RootTabProps>();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: '#15141F',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: { display: 'none' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="home" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="play-circle" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
        }}
      />
      <Tab.Screen
        name="MovieItem"
        component={MovieItem}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="user" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
