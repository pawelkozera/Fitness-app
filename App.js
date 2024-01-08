import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import DrawerNav from './src/navigation/Drawer';
import LoginNavigator from './src/navigation/LoginNavigator';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <LoginNavigator />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}