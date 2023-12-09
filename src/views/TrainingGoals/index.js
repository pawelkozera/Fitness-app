import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from "../../context/ThemeContext";

const CustomCheckbox = ({ checked, onChange }) => {
  const handlePress = () => {
    onChange && onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ width: 24, height: 24, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
        {checked && <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'green' }} />}
      </View>
    </TouchableOpacity>
  );
};

const TrainingGoalsView = ({ name, category, onRemove }) => {
  const {theme} = useTheme();
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
        <View style={{marginLeft: 40}}>
            <CustomCheckbox checked={isChecked} onChange={handleCheckBoxToggle} />
        </View>
    </View>
  );
};

export function TrainingGoals({ navigation }) {
  const {theme} = useTheme();

  const trainingGoals = [
    { id: 1, name: 'Goal 1', category: 'Running' },
    { id: 2, name: 'Goal 2', category: 'Cycling' },
    { id: 3, name: 'Goal 2', category: 'Cycling' },
    { id: 4, name: 'Goal 2', category: 'Cycling' },
  ];

  const [visibleGoals, setVisibleGoals] = useState(trainingGoals);

  const handleRemoveGoal = (goalId) => {
    const updatedGoals = visibleGoals.filter((goal) => goal.id !== goalId);
    setVisibleGoals(updatedGoals);
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
      </View>
    </View>
  );
}
