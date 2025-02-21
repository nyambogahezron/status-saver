import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Saved from './Saved';
import Images from './Images';
import Videos from './Videos';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/content/GlobalContent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '..';

const Tab = createMaterialTopTabNavigator();

export default function StatusScreen() {
	const { isPermissionGranted } = useGlobalContext();
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	React.useEffect(() => {
		if (isPermissionGranted) {
			navigation.navigate('Home');
		}
	}, [isPermissionGranted]);

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
