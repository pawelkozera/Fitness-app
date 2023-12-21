import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { serverConfig } from '../../config/config';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { styles } from './style';

export function TrainingHistoryEdit({ route, navigation }) {
  const { theme } = useTheme();
  const { selectedTraining } = route.params;

  const [editedTrainingType, setEditedTrainingType] = useState(selectedTraining.trainingType);
  const [editedDistance, setEditedDistance] = useState(selectedTraining.distance.toString());
  const [editedDuration, setEditedDuration] = useState(selectedTraining.duration.toString());

  const trainingOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
  ];

  const handleSave = async () => {
    try {
      const url = `${serverConfig.apiUrl}:${serverConfig.port}/trainings/${selectedTraining.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingType: editedTrainingType,
          distance: parseFloat(editedDistance),
          duration: parseInt(editedDuration, 10),
          pace: editedDistance/editedDuration*60*60,
          calories: editedDistance/editedDuration*60*60/2,
          date: new Date(selectedTraining.date).toISOString(),
          routeId: 1,
        }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        console.error('Error updating training');
      }
    } catch (error) {
      console.error('Error updating training', error);
    }
  };

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <Text style={styles.detailTitle}>Training Type:</Text>
        <SelectList
            data={trainingOptions}
            whatWithSelected={(value) => {
                setEditedTrainingType(value);
            }}
            maxHeightList={150}
            placeholder={editedTrainingType}
            notFoundText="Date not found"
            valueToBeSaved="value"
            afterSelecting={(value) => setEditedTrainingType(value)}
            containerStyle={{ width: 200, borderColor: 'black' }}
            containerDataStyle={{ width: 200, borderColor: 'gray' }}
            infoFontStyle={{ fontSize: 18, fontWeight: 'bold' }}
            containerFontsStyle={{ fontSize: 18, fontWeight: 'normal' }}
            />

        <Text style={styles.detailTitle}>Distance (km):</Text>
        <TextInput
          style={styles.editInput}
          value={editedDistance}
          onChangeText={setEditedDistance}
          keyboardType="numeric"
        />

        <Text style={styles.detailTitle}>Duration (s):</Text>
        <TextInput
          style={styles.editInput}
          value={editedDuration}
          onChangeText={setEditedDuration}
          keyboardType="numeric"
        />

        <TouchableOpacity style={theme.touchableItem} onPress={handleSave}>
          <Text style={theme.touchableItemText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
