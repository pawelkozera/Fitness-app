import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';

const CustomCheckbox = ({ checked, onChange }) => {
  const handlePress = () => {
    onChange && onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'black',
          marginRight: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {checked && <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'green' }} />}
      </View>
    </TouchableOpacity>
  );
};

const TrainingGoalsView = ({ name, category, onRemove }) => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
    if (onRemove && isChecked) {
      onRemove();
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
      <View>
        <Text style={theme.text}>{name}</Text>
        <Text style={theme.text}>{category}</Text>
      </View>
      <View style={{ marginLeft: 40 }}>
        <CustomCheckbox checked={isChecked} onChange={handleCheckBoxToggle} />
      </View>
    </View>
  );
};

export function TrainingGoals({ navigation }) {
  const { theme } = useTheme();
  const [visibleGoals, setVisibleGoals] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.4:3004/trainingGoals');
      if (response.ok) {
        const data = await response.json();
        setVisibleGoals(data || []);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleRemoveGoal = async (goalId) => {
    try {
      const response = await fetch(`http://192.168.1.4:3004/trainingGoals/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedGoals = visibleGoals.filter((goal) => goal.id !== goalId);
        setVisibleGoals(updatedGoals);
      } else {
        console.error('Error deleting goal:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        {visibleGoals.map((goal) => (
          <TrainingGoalsView
            key={goal.id}
            name={goal.name}
            category={goal.category}
            onRemove={() => handleRemoveGoal(goal.id)}
          />
        ))}

        <TouchableOpacity
          style={theme.touchableItem}
          onPress={() => {
            navigation.navigate('AddTrainingGoal');
          }}
        >
          <Text style={theme.touchableItemText}>Add goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
