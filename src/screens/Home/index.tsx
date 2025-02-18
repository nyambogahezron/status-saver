import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Saved from './Saved';
import Images from './Images';
import Videos from './Videos';
import { Colors } from '@/constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function StatusScreen() {
	return (
		<Tab.Navigator
			initialRouteName='Images'
			screenOptions={{
				tabBarLabelStyle: { fontSize: 15, fontFamily: 'Rb-Regular' },
				tabBarStyle: { backgroundColor: Colors.primaryColor },
				tabBarIndicatorStyle: {
					backgroundColor: Colors.white,
					height: 3,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 5,
				},
				tabBarActiveTintColor: Colors.white,
				tabBarInactiveTintColor: Colors.gray,
			}}
		>
			<Tab.Screen name='Images' component={Images} />
			<Tab.Screen name='Videos' component={Videos} />
			<Tab.Screen name='Saved' component={Saved} />
		</Tab.Navigator>
	);
}
