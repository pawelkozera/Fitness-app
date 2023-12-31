import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import DrawerNav from './src/navigation/Drawer';
import LoginNavigator from './src/navigation/LoginNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}