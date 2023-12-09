import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNav from './BottomTab';
import { Settings, PocketWorkouts, TrainingHistory, Routes } from '../views';
import { useTheme } from '../context/ThemeContext';
import PocketWorkoutsNavigator from './PocketWorkoutsNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const {theme} = useTheme();

  return (
    <Drawer.Navigator initialRouteName="Main"
    screenOptions={{
      headerStyle: {
          backgroundColor: theme.navigation.headerBackground,
      },
      drawerStyle: {
          backgroundColor: theme.navigation.drawerBackground, 
      },
      drawerLabelStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerTitleStyle: {
        fontWeight: 'bold', 
      },
      headerTintColor: theme.navigation.text, 
      drawerActiveTintColor: theme.navigation.text, 
      drawerInactiveTintColor: theme.navigation.inactiveText,
  }}>
        <Drawer.Screen name="Main" component={BottomTabNav} />
        <Drawer.Screen name="Training History" component={TrainingHistory} />
        <Drawer.Screen name="Pocket Workouts" component={PocketWorkoutsNavigator}/>
        <Drawer.Screen name="Routes" component={Routes} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}