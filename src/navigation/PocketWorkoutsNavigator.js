import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { WorkoutDetails } from "../views/WorkoutDetails";
import { PocketWorkouts } from "../views";
import { ExerciseDetails } from "../views/ExerciseDetails";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function PocketWorkoutsNavigator() {
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
                name="PocketWorkouts"
                component={PocketWorkouts}
                options={{title: 'PocketWorkouts', headerShown: false}} />
            <Stack.Screen 
                name="WorkoutDetails"
                component={WorkoutDetails}
                options={{title: 'Workout Details'}} />
            <Stack.Screen 
                name="ExerciseDetails"
                component={ExerciseDetails}
                options={{title: 'Exercise Details'}} />
        </Stack.Navigator>
    );
}