import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WeeklyAchievements, MainScreen, TrainingGoals } from '../views';
import { BottomTabIcon } from '../components/BottomTabIcon';

const optionScreen = {
  headerShown: false,
  tabBarShowLabel: false,
};

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return <BottomTabIcon routeName={route?.name} focused={focused} />;
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