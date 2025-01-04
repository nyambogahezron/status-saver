import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Home';
import Images from './Images';
import Videos from './Videos';
import Audio from './Audio';
import { Colors } from '@/constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function StatusScreen() {
  return (
    <Tab.Navigator
      initialRouteName='All'
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13 },
        tabBarStyle: { backgroundColor: Colors.greenLight },
      }}
    >
      <Tab.Screen name='All' component={HomeScreen} />
      <Tab.Screen name='Images' component={Images} />
      <Tab.Screen name='Videos' component={Videos} />
      <Tab.Screen name='Audios' component={Audio} />
    </Tab.Navigator>
  );
}
