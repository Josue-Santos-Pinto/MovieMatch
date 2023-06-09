import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MovieItem } from '../pages/MovieItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import PerfilStack from './PerfilStack';
import { Perfil } from '../pages/Perfil';

export type RootTabProps = {
  HomeStack: undefined;
  SearchStack: undefined;
  PerfilStack: undefined;
  MovieItem: {
    id: number;
    platform: string;
  };
};

const Tab = createBottomTabNavigator<RootTabProps>();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
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
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="home" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="play-circle" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
        }}
      />
      <Tab.Screen
        name="PerfilStack"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Icon name="user" size={25} color={focused ? '#ff8f70' : '#ccc'} />;
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="MovieItem" component={MovieItem} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
};
