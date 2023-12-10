import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { serverConfig } from '../../config/config';

export function AddTrainingGoal({ navigation }) {
  const { theme } = useTheme();
  const [goalName, setGoalName] = useState('');
  const [selectedTraining, setSelectedTraining] = useState('Running');

  const trainingOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
  ];

  const saveTrainingGoal = async () => {
    const newGoal = {
      name: goalName,
      category: selectedTraining,
    };

    try {
      const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/trainingGoals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        navigation.setOptions({
          params: {
            handleAddGoal: (newGoal) => {
              handleAddGoal(newGoal);
            },
          },
        });
        navigation.goBack();
      } else {
        console.error('Adding goal error', response.statusText);
      }
    } catch (error) {
      console.error('POST error', error);
    }
  };

  return (
    <View style={theme.background}>
      <View style={theme.container}>
      <SelectList
        data={trainingOptions}
        whatWithSelected={(value) => {
            setSelectedTraining(value);
        }}
        maxHeightList={150}
        placeholder={selectedTraining}
        notFoundText="Date not found"
        valueToBeSaved="value"
        afterSelecting={() => console.log('return function')}
        containerStyle={{ width: 200, borderColor: 'black' }}
        containerDataStyle={{ width: 200, borderColor: 'gray' }}
        infoFontStyle={{ fontSize: 18, fontWeight: 'bold' }}
        containerFontsStyle={{ fontSize: 18, fontWeight: 'normal' }}
        />

        <Text style={theme.text}>Enter Training Goal Name:</Text>
        <TextInput
          style={theme.input}
          placeholder="Type here..."
          value={goalName}
          onChangeText={(text) => setGoalName(text)}
        />

        <TouchableOpacity
          style={theme.touchableItem}
          onPress={saveTrainingGoal}
        >
          <Text style={theme.touchableItemText}>Add goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
