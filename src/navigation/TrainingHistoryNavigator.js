import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TrainingHistory, TrainingHistoryDetails } from "../views";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function TrainingHistoryNavigator() {
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
                    name="TrainingHistoryList"
                    component={TrainingHistory}
                    options={{title: 'Training History', headerShown: false}} 
                />
                <Stack.Screen 
                    name="TrainingHistoryDetails"
                    component={TrainingHistoryDetails}
                    options={{title: 'Training Details'}} 
                />
        </Stack.Navigator>
    );
}