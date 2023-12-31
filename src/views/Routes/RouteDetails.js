import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { serverConfig } from '../../config/config';
import { styles } from "./style";

export function RouteDetails({ route, navigation }) {
    const { theme } = useTheme();

    const { selectedRoute, routeDeleteMode, selectedTraining, isTrainingEdit } = route.params;

    const [heading, setHeading] = useState(0);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        setRegion(selectedRoute.region);
    }, [selectedRoute]);

    const deleteRoute = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/routes/${selectedRoute.id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigation.goBack();
            } else {
                console.error('Error deleting training');
            }
        } catch (error) {
            console.error('Error deleting training', error);
        }
    };

    const selectRoute = () => {
        if (isTrainingEdit) {
            const newRouteId = selectedRoute.id;
            const selectedTrainingCopy = selectedTraining;

            navigation.navigate('TrainingHistoryEdit', { selectedTraining: selectedTrainingCopy,  newRouteId: newRouteId });
        }
        else {
            const newRouteId = selectedRoute.id;

            navigation.navigate('TrainingHistoryAdd', { newRouteId: newRouteId });
        }
    };

  return (
    <View style={theme.background}>
        <MapView
            style={{ flex: 0.95 }}
            region={region}
            onRegionChangeComplete={() => {}}
            showsUserLocation={false}
            followsUserLocation={false}
            rotateEnabled={true}
            showsMyLocationButton={false}
            provider="google"
            customMapStyle={mapStyle}
            heading={heading}
            zoomEnabled={true}
            zoomControlEnabled={false}
            scrollEnabled={true}
        >
            {selectedRoute.coordinates && selectedRoute.coordinates.length > 0 && (
                <Polyline coordinates={selectedRoute.coordinates} strokeWidth={5} strokeColor="blue" />
            )}
        </MapView>
        
        {(routeDeleteMode &&
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={deleteRoute}
                >
                <Text style={theme.touchableItemText}>Delete</Text>
            </TouchableOpacity>
        )}

        {(!routeDeleteMode &&
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={selectRoute}
                >
                <Text style={theme.touchableItemText}>Select</Text>
            </TouchableOpacity>
        )}
    </View>
  );
}

const mapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];