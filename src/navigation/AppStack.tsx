import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Filter from '../screens/Filter';
import EventDetail from '../screens/EventDetail';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
        }}
        name="Filter"
        component={Filter}
      />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default AppStack;
