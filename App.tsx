import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import GlobalProvider from '@/content/GlobalContent';
import Navigation from './navigation';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 400,
	fade: true,
});

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

	return <Navigation />;
}

export default function App() {
	return (
		<GlobalProvider>
			<RootStack />
		</GlobalProvider>
	);
}
