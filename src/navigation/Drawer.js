
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNav from './BottomTab';
import { Settings, PocketWorkouts, TrainingHistory, Routes, TrainingGoals } from '../views';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={BottomTabNav} />
        <Drawer.Screen name="Training Goals" component={TrainingGoals} />
        <Drawer.Screen name="Training History" component={TrainingHistory} />
        <Drawer.Screen name="Pocket Workouts" component={PocketWorkouts} />
        <Drawer.Screen name="Routes" component={Routes} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}