import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MainScreen, SaveTraining } from "../views";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function MainScreenNavigator() {
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
                    name="MainScreenStartTraining"
                    component={MainScreen}
                    options={{title: 'Start Training', headerShown: false}} 
                />
                <Stack.Screen 
                    name="MainScreenSaveTraining"
                    component={SaveTraining}
                    options={{title: 'Save training details'}} 
                />
        </Stack.Navigator>
    );
}