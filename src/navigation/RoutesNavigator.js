import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Routes, RouteDetails } from "../views";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function RoutesNavigator() {
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
                    name="RouteList"
                    component={Routes}
                    options={{title: 'Route List', headerShown: false}} 
                />
                <Stack.Screen 
                    name="RouteDetail"
                    component={RouteDetails}
                    options={{title: 'Route Details'}} 
                />
        </Stack.Navigator>
    );
}