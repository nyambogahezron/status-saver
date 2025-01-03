import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import CustomHeader from '@/components/ui/CustomHeader';

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
