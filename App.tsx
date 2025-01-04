import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import Screens from '@/screens';
import CustomHeader from '@/components/ui/CustomHeader';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

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
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Screens.HomeScreen}
        options={{
          headerShown: true,
          title: '',
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen name='Settings' component={Screens.SettingsScreen} />
      <Stack.Screen name='CleanUp' component={Screens.CleanUpScreen} />
      <Stack.Screen
        name='FilesExplorer'
        component={Screens.FilesExplorer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Status'
        component={Screens.StatusScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
