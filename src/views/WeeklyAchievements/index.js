import React, { useState, useEffect } from 'react';
import { Text, ToastAndroid, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style";
import { serverConfig } from '../../config/config';

export function WeeklyAchievements({ navigation }) {
  const { theme } = useTheme();
  const [trainings, setTrainings] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/trainings`);
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error('Error fetching trainings', error);
      }
    };

    fetchTrainings();
  }, []);

  const calculateWeeklySummary = () => {
    if (trainings === null) {
      return {
        distance: 0,
        calories: 0,
        duration: 0,
        pace: 0,
      };
    }

    const today = new Date();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    const weeklyTrainings = trainings.filter(training => {
      const trainingDate = new Date(training.date);
      return trainingDate >= lastMonday && trainingDate <= today;
    });

    const summary = {
      distance: weeklyTrainings.reduce((sum, training) => sum + training.distance, 0),
      calories: weeklyTrainings.reduce((sum, training) => sum + training.calories, 0),
      duration: weeklyTrainings.reduce((sum, training) => sum + training.duration, 0),
      pace: weeklyTrainings.length > 0 ? weeklyTrainings.reduce((sum, training) => sum + training.pace, 0) / weeklyTrainings.length : 0,
    };

    return summary;
  };

  const weeklySummary = calculateWeeklySummary();

  const todayDate = new Date();
  let lastMonday = new Date(todayDate);
  lastMonday.setDate(todayDate.getDate() - ((todayDate.getDay() + 6) % 7));

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <Text style={styles.title}>Weekly Achievements</Text>
        <Text style={theme.text}> {lastMonday.toLocaleDateString('pl-PL', {month: 'numeric', day: 'numeric'})} - {todayDate.toLocaleDateString('pl-PL', { month: 'numeric', day: 'numeric' })}</Text>

        <Text style={theme.text}>Distance: {weeklySummary.distance} km</Text>
        <Text style={theme.text}>Calories: {weeklySummary.calories} kcal</Text>
        <Text style={theme.text}>Duration: {weeklySummary.duration} minutes</Text>
        <Text style={theme.text}>Average Pace: {weeklySummary.pace.toFixed(2)} km/h</Text>
      </View>
    </View>
  );
}
