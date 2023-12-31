import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { serverConfig } from '../../config/config';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { styles } from './style';

export function TrainingHistoryAdd({ route, navigation }) {
  const { theme } = useTheme();

  const { newRouteId } = route.params;

  const [trainingType, setTrainingType] = useState("Running");
  const [distance, setDistance] = useState("0");
  const [duration, setDuration] = useState("0");

  const [routeDetails, setRouteDetails] = useState(null);

  const trainingOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
  ];

  const selectNewRoute = () => {
    const routeDeleteMode = false;
    const isTrainingEdit = false;
    const selectedTraining = null;

    navigation.navigate('TrainingHistoryRoutesList', { routeDeleteMode, selectedTraining, isTrainingEdit});
  };

  const fetchRouteDetails = async (routeId) => {
    try {
        const url = `${serverConfig.apiUrl}:${serverConfig.port}/routes/${routeId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching training details', error);
        throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchRouteDetails(newRouteId);
            setRouteDetails(data);
        } catch (error) {
            console.error('Error fetching training details', error);
        }
    };

    fetchData();
  }, [newRouteId]);

  const saveTraining = () => {
    const isCustomTraining = true;
    const trainingTypeCopy = trainingType;
    const distanceCopy = parseInt(distance, 10);
    let durationCopy = parseInt(duration, 10);
    let paceCopy = 0;
    let caloriesCopy = 0;

    if (durationCopy != 0) {
      paceCopy = distanceCopy/durationCopy*60*60;
      caloriesCopy = distanceCopy/durationCopy*60*60/2;
    }

    const coordinatesCopy = routeDetails.coordinates;
    const regionCopy = routeDetails.region;
    const headingCopy = null;
    const routeIdCopy = newRouteId;

    const trainingData = {
      selectedTraining: trainingTypeCopy,
      totalDistance: distanceCopy,
      duration: durationCopy,
      pace: paceCopy,
      calories: caloriesCopy,
      coordinates: coordinatesCopy,
      region: regionCopy,
      heading: headingCopy,
      routeId: routeIdCopy,
      isCustomTraining: isCustomTraining,
    };

    navigation.navigate('TrainingHistorySave', { trainingData });
  };

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <Text style={styles.detailTitle}>Training Type:</Text>
        <SelectList
            data={trainingOptions}
            whatWithSelected={(value) => {
                setTrainingType(value);
            }}
            maxHeightList={150}
            placeholder={trainingType}
            notFoundText="Date not found"
            valueToBeSaved="value"
            afterSelecting={(value) => setTrainingType(value)}
            containerStyle={{ width: 200, borderColor: 'black' }}
            containerDataStyle={{ width: 200, borderColor: 'gray' }}
            infoFontStyle={{ fontSize: 18, fontWeight: 'bold' }}
            containerFontsStyle={{ fontSize: 18, fontWeight: 'normal' }}
            />

        <Text style={styles.detailTitle}>Distance (km):</Text>
        <TextInput
          style={styles.editInput}
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
        />

        <Text style={styles.detailTitle}>Duration (s):</Text>
        <TextInput
          style={styles.editInput}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <Text style={styles.detailTitle}>Route: {newRouteId}</Text>
        <TouchableOpacity style={theme.touchableItem} onPress={selectNewRoute}>
          <Text style={theme.touchableItemText}>Select route</Text>
        </TouchableOpacity>

        <TouchableOpacity style={theme.touchableItem} onPress={saveTraining}>
          <Text style={theme.touchableItemText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
