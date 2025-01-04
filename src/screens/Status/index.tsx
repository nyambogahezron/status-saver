import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Home';
import Images from './Images';
import Videos from './Videos';
import Audio from './Audio';

const Tab = createMaterialTopTabNavigator();

export default function StatusScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='All' component={HomeScreen} />
      <Tab.Screen name='Images' component={Images} />
      <Tab.Screen name='Videos' component={Videos} />
      <Tab.Screen name='Audios' component={Audio} />
    </Tab.Navigator>
  );
}
