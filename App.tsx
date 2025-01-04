import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import CustomHeader from '@/components/ui/CustomHeader';
import CleanUpScreen from '@/screens/CleanUpScreen';
import FilesExplorer from '@/screens/FilesExplorer';
import StatusScreen from '@/screens/Status';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: true,
          title: '',
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='CleanUp' component={CleanUpScreen} />
      <Stack.Screen
        name='FilesExplorer'
        component={FilesExplorer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Status'
        component={StatusScreen}
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
