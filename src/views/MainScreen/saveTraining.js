import React, { useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { serverConfig } from '../../config/config';

export function SaveTraining({ route, navigation }) {
  const { theme } = useTheme();

  const { trainingData } = route.params;
  const { selectedTraining, totalDistance, duration, pace, calories, coordinates, region, heading } = trainingData;

  const [trainingSaved, setTrainingSaved] = useState(false);
  const [routeSaved, setRouteSaved] = useState(false);
  const [routeId, setRouteId] = useState(null);

  const saveRoute = async () => {
    try {
      const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          coordinates,
          region: region,
         }),
      });
  
      if (response.ok) {
        console.log('Route saved');
        const routeInfo = await response.json();
        setRouteId(routeInfo.id);
        setRouteSaved(true);
      } else {
        console.error('Route save error', response.statusText);
      }
    } catch (error) {
      console.error('Error route POST', error);
    }
  };  

  const saveTrainingPhoto = () => {
    console.log(routeId);
    const trainingData = {
      selectedTraining,
      totalDistance,
      duration,
      pace,
      calories,
      coordinates,
      region,
      heading,
      routeId
    };

    navigation.navigate('MainScreenSaveTrainingPhoto', { trainingData });
  }

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
        <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
    </MapView>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Text style={theme.text}> Distance: {totalDistance.toFixed(2)} km </Text>
        <Text style={theme.text}> Duration: {duration.toFixed(2)} s </Text>
        <Text style={theme.text}> Pace: {pace.toFixed(2)} km/h </Text>
        <Text style={theme.text}> Calories: {calories.toFixed(2)} kcal </Text>
    </View>

    <View>
        {!trainingSaved && (
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={saveTrainingPhoto}
                >
                <Text style={theme.touchableItemText}>Save training</Text>
            </TouchableOpacity>
        )}

        {!routeSaved && (
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={saveRoute}
                >
                <Text style={theme.touchableItemText}>Save route</Text>
            </TouchableOpacity>
        )}
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