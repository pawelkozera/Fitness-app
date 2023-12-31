import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { serverConfig } from '../../config/config';

export function Routes({ route, navigation }) {
    const { theme } = useTheme();
    const [routes, setRoutes] = useState([]);
    const { routeDeleteMode, selectedTraining, isTrainingEdit } = route.params || {};

    const fetchRoutes = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/routes`;
            const response = await fetch(url);
            const data = await response.json();
    
            setRoutes(data);
        } catch (error) {
            console.error('Error fetching routes', error);
        }
    };

    const Item = ({ id }) => (
        <TouchableOpacity
            style={theme.touchableItem}
            onPress={() => {
                let selectedTrainingCopy = null;
                const selectedRoute = routes.find(route => route.id === id);
                let routeDeleteModeCopy = true;
                let isTrainingEditCopy = false;
    
                if (routeDeleteMode !== undefined) {
                    routeDeleteModeCopy = false;
                    selectedTrainingCopy = selectedTraining;
                    isTrainingEditCopy = isTrainingEdit;
                    navigation.navigate('TrainingHistoryRouteSelection', {
                        selectedRoute,
                        routeDeleteMode: routeDeleteModeCopy,
                        selectedTraining: selectedTrainingCopy,
                        isTrainingEdit: isTrainingEditCopy,
                    });
                } else {
                    navigation.navigate('RouteDetail', {
                        selectedRoute,
                        routeDeleteMode: routeDeleteModeCopy,
                        selectedTraining: selectedTrainingCopy,
                        isTrainingEdit: isTrainingEditCopy,
                    });
                }
            }}
        >
            <Text style={theme.touchableItemText}>{"Route " + id}</Text>
        </TouchableOpacity>
    );
        

    useFocusEffect(
        React.useCallback(() => {
            fetchRoutes();
        }, [])
    );

    return (
        <SafeAreaView style={theme.background}>
            <View style={theme.container}>
                <FlatList
                    data={routes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item id={item.id} />}
                />
            </View>
        </SafeAreaView>
    );
}
