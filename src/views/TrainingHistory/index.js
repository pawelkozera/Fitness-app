import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { serverConfig } from '../../config/config';

export function TrainingHistory({ navigation }) {
    const { theme } = useTheme();
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/trainings`;
            const response = await fetch(url);
            const data = await response.json();

            const sortedTrainings = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            setTrainings(sortedTrainings);
        } catch (error) {
            console.error('Error fetching trainings', error);
        }
    };

    const Item = ({ id, date, thumbnailUrl }) => (
        <TouchableOpacity
            style={theme.touchableItem}
            onPress={() => {
                const selectedTraining = trainings.find(training => training.id === id);
            
                navigation.navigate('TrainingHistoryDetails', { selectedTraining });
            }}
        >
            <Image source={require('./testowy.png')} style={{ width: 130, height: 100}} />
            <Text style={theme.touchableItemText}>{formatDate(date)}</Text>
        </TouchableOpacity>
    );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTrainings();
        }, [])
    );

    return (
        <SafeAreaView style={theme.background}>
            <View style={theme.container}>
                <FlatList
                    data={trainings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item id={item.id} date={item.date} thumbnailUrl='testowy.png' />}
                />
            </View>
        </SafeAreaView>
    );
}
