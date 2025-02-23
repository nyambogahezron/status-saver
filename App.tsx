import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import Screens from '@/screens';
import CustomHeader from '@/components/ui/CustomHeader';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import GlobalProvider from '@/content/GlobalContent';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 400,
	fade: true,
});

const Stack = createNativeStackNavigator();

function RootStack() {
	const [loaded, error] = useFonts({
		'Rb-Black': require('./assets/fonts/RobotoCondensed-Black.ttf'),
		'Rb-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
		'Rb-ExtraLight': require('./assets/fonts/RobotoCondensed-ExtraLight.ttf'),
		'Rb-Medium': require('./assets/fonts/RobotoCondensed-Medium.ttf'),
		'Rb-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
	});

	React.useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<Stack.Navigator initialRouteName='Welcome'>
			<Stack.Screen
				name='Welcome'
				component={Screens.Welcome}
				options={{
					headerShown: false,
				}}
			/>
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
			<Stack.Screen
				name='UserAgreement'
				component={Screens.UserAgreement}
				options={{
					headerShown: true,
					header: () => <CustomHeader title='User Agreement' />,
				}}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<GlobalProvider>
			<NavigationContainer>
				<StatusBar backgroundColor='#00a884' barStyle='light-content' />
				<RootStack />
			</NavigationContainer>
		</GlobalProvider>
	);
}
