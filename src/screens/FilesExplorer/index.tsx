import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Images from './Images';
import Videos from './Videos';
import Audio from './Audio';
import Stickers from './Stickers';
import Documents from './Documents';

const Tab = createMaterialTopTabNavigator();

export default function StatusScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Images' component={Images} />
      <Tab.Screen name='Videos' component={Videos} />
      <Tab.Screen name='Audio' component={Audio} />
      <Tab.Screen name='Stickers' component={Stickers} />
      <Tab.Screen name='Documents' component={Documents} />
      
    </Tab.Navigator>
  );
}
