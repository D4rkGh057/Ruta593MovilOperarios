import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import ScannerScreen from '../components/ScannerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
  <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
};

export default AppNavigator;