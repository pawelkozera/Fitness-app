import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Routes, RouteDetails } from "../views";
import DrawerNav from './Drawer';
import { useTheme } from "../context/ThemeContext";
import { Login, Register } from "../views";

const Stack = createStackNavigator();

export default function LoginNavigator() {
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
                    name="Login"
                    component={Login}
                    options={{title: 'Login', headerShown: false}} 
                />
                <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{title: 'Register'}} 
                />
                <Stack.Screen 
                    name="DrawerNavigation"
                    component={DrawerNav}
                    options={{title: 'Drawer Navigation', headerShown: false}} 
                />
        </Stack.Navigator>
    );
}