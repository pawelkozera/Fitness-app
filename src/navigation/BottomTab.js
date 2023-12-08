import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WeeklyAchievements, MainScreen, TrainingGoals } from '../views';
import { BottomTabIcon } from '../components/BottomTabIcon';
import { useTheme } from '../context/ThemeContext';

const optionScreen = {
  headerShown: false,
  tabBarShowLabel: false,
};

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return <BottomTabIcon routeName={route?.name} focused={focused} />;
        },
        tabBarStyle: {
          backgroundColor: theme.navigation.bottomBackground,
        },
      })}
    >
      <Tab.Screen
        name="WeeklyAchievements"
        component={WeeklyAchievements}
        options={optionScreen}
      />
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={optionScreen}
      />
      <Tab.Screen name="TrainingGoals" component={TrainingGoals} options={optionScreen} />
    </Tab.Navigator>
  );
}