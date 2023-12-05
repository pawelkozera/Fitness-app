import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNav from "./src/navigation/BottomTab";

export default function App() {
  return (
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
  );
}
