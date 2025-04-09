import React from 'react';
import CustomHeader from '@/components/ui/CustomHeader';
import Screens from '@/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { useGlobalContext } from '@/content/GlobalContent';

const Stack = createNativeStackNavigator();

export default function Navigation() {
	const { isPermissionGranted } = useGlobalContext();

	console.log(isPermissionGranted);
	return (
		<NavigationContainer>
			<StatusBar backgroundColor='#00a884' barStyle='light-content' />
			<Stack.Navigator
				initialRouteName={isPermissionGranted ? 'Home' : 'Welcome'}
			>
				{!isPermissionGranted ? (
					<Stack.Screen
						name='Welcome'
						component={Screens.Welcome}
						options={{
							headerShown: false,
						}}
					/>
				) : (
					<>
						<Stack.Screen
							name='Home'
							component={Screens.HomeScreen}
							options={{
								headerShown: true,
								title: '',
								header: () => <CustomHeader showBackButton={false} />,
							}}
						/>
						<Stack.Screen
							name='Settings'
							component={Screens.Settings}
							options={{
								headerShown: true,
								title: 'Settings',
								header: () => <CustomHeader title='Settings' />,
							}}
						/>
						<Stack.Screen
							name='Help'
							component={Screens.Help}
							options={{
								headerShown: true,
								title: 'Help',
								header: () => <CustomHeader title='Help' />,
							}}
						/>
					</>
				)}
				<Stack.Screen
					name='UserAgreement'
					component={Screens.UserAgreement}
					options={{
						headerShown: true,
						header: () => <CustomHeader title='User Agreement' />,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
