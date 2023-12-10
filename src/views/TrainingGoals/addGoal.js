import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from "../../context/ThemeContext";

export function AddTrainingGoal({ navigation }) {
  const {theme} = useTheme();

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <TouchableOpacity
          style={theme.touchableItem}
          onPress={() => {
            navigation.navigate('addTrainingGoal')
          }}
        >
          <Text style={theme.touchableItemText}>Add goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
