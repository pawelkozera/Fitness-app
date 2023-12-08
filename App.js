import 'react-native-gesture-handler';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import DrawerNav from './src/navigation/Drawer';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}