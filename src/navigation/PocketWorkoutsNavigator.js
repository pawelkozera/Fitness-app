import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { WorkoutsDetails } from "../views/WorkoutsDetails";
import { PocketWorkouts } from "../views";
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
                name="WorkoutsDetails"
                component={WorkoutsDetails}
                options={{title: 'WorkoutsDetails'}} />
        </Stack.Navigator>
    );
}