import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style";
import { FlatList } from "react-native-gesture-handler";
import { serverConfig } from '../../config/config';

export function WorkoutDetails({ route, navigation }) {
    const [workouts, setWorkouts] = useState([]);
    const { theme } = useTheme();
    const { workoutID } = route.params;

    useEffect(() => {
        const url = `${serverConfig.apiUrl}:${serverConfig.port}/pocketWorkouts`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0 && data[0].pocketWorkouts) {
                    setWorkouts(data[0].pocketWorkouts);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const selectedWorkout = workouts.find(workout => workout.id === workoutID);

    const renderExerciseItem = ({ item }) => (
        <TouchableOpacity 
            style={theme.touchableItem} 
            onPress={() => {
                navigation.navigate('ExerciseDetails', { exerciseDetails: item })
            }}
        >
            <Text style={theme.touchableItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <Text style={styles.title}>Select Exercise</Text>
                <FlatList 
                    data={selectedWorkout?.exercises}
                    renderItem={renderExerciseItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}
