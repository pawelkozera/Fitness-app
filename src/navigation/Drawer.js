
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNav from './BottomTab';
import { Settings, PocketWorkouts, TrainingHistory, Routes } from '../views';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const {theme} = useTheme();

  return (
    <Drawer.Navigator initialRouteName="Main"
    screenOptions={{
      headerStyle: {
          backgroundColor: theme.navigation.headerBackground,
      },
      headerTintColor: theme.navigation.headerText, 
  }}>
        <Drawer.Screen name="Main" component={BottomTabNav} />
        <Drawer.Screen name="Training History" component={TrainingHistory} />
        <Drawer.Screen name="Pocket Workouts" component={PocketWorkouts} />
        <Drawer.Screen name="Routes" component={Routes} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}