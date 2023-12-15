import React, { useEffect, useState } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./style";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import { serverConfig } from '../../config/config';

export function PocketWorkouts({ navigation }) {
    const [pocketWorkouts, setPocketWorkouts] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        const url = `${serverConfig.apiUrl}:${serverConfig.port}/pocketWorkouts`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0 && data[0].pocketWorkouts) {
                    setPocketWorkouts(data[0].pocketWorkouts);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const Item = ({ id, title }) => (
        <TouchableOpacity 
            style={theme.touchableItem} 
            onPress={() => navigation.navigate('WorkoutDetails', { workoutID: id })}
        >
            <Text style={theme.touchableItemText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={theme.background}>
            <View style={theme.container}>
                <Text style={styles.title}>Select Workouts</Text>
                <FlatList
                    data={pocketWorkouts}
                    renderItem={({ item }) => <Item id={item.id} title={item.title} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
}