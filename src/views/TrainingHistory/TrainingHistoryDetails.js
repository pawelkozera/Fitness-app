import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { serverConfig } from '../../config/config';
import { styles } from "./style";

export function TrainingHistoryDetails({ route, navigation }) {
    const { theme } = useTheme();
    const [heading, setHeading] = useState(0);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [routeDetails, setRouteDetails] = useState([]);

    const { selectedTraining } = route.params;
    console.log(selectedTraining);

    useEffect(() => {
        fetchRouteDetails(selectedTraining.routeId);
    }, [selectedTraining.routeId]);

    const fetchRouteDetails = async (routeId) => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/routes/${routeId}`;
            const response = await fetch(url);
            const data = await response.json();
            setRouteDetails(data);
        } catch (error) {
            console.error('Error fetching route details', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    useEffect(() => {
        console.log(routeDetails.coordinates);
        setRegion(routeDetails.region);
    }, [routeDetails]);

    const deleteTraining = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/trainings/${selectedTraining.id}`;
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

  return (
    <View style={theme.background}>
        <MapView
            style={{ flex: 0.8 }}
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
            {routeDetails.coordinates && routeDetails.coordinates.length > 0 && (
                <Polyline coordinates={routeDetails.coordinates} strokeWidth={5} strokeColor="blue" />
            )}
        </MapView>

        <View style={[theme.container]}>
            <View style={[theme.backgroundItem, {flexDirection: 'row'}]}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Type:</Text>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Distance:</Text>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Duration:</Text>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Pace:</Text>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Calories:</Text>
                    <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Date:</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{selectedTraining.trainingType}</Text>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{selectedTraining.distance} km</Text>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{selectedTraining.duration} s</Text>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{selectedTraining.pace} km/h</Text>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{selectedTraining.calories} kcal</Text>
                    <Text style={[styles.detailText, {color: theme.detail.textColor}]}>{formatDate(selectedTraining.date)}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={theme.touchableItem}
                onPress={console.log("Edit")}
                >
                <Text style={theme.touchableItemText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={theme.touchableItem}
                onPress={deleteTraining}
                >
                <Text style={theme.touchableItemText}>Delete</Text>
            </TouchableOpacity>
        </View>
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