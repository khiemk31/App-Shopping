import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './AppContainer';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
