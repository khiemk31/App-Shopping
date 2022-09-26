import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../login/LoginScreen';
import HomeScreen from '../home/HomeScreen';

export enum ScreenName {
  HOME_SCREEN = 'HomeScreen',
  LOGIN_SCREEN = 'LoginScreen',
}
export default function MyStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenName.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={ScreenName.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
}
