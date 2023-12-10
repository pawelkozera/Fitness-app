import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TrainingGoals, AddTrainingGoal } from "../views";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function TrainingGoalsNavigator() {
    const {theme} = useTheme();

    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: theme.navigation.headerBackground, 
            },
            headerTintColor: theme.navigation.text,
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}>
                <Stack.Screen 
                    name="TrainingGoalsStack"
                    component={TrainingGoals}
                    options={{title: 'TrainingGoals', headerShown: false}} 
                />
                <Stack.Screen 
                    name="AddTrainingGoal"
                    component={AddTrainingGoal}
                    options={{title: 'AddTrainingGoal'}} 
                />
        </Stack.Navigator>
    );
}