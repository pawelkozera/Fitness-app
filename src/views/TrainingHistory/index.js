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
    const defaultThumbnail = require('./testowy.png');

    const fetchTrainings = async () => {
        try {
          const trainingUrl = `${serverConfig.apiUrl}:${serverConfig.port}/trainings`;
          const photoUrl = `${serverConfig.apiUrl}:${serverConfig.port}/photos`;
      
          const [trainingsResponse, photosResponse] = await Promise.all([
            fetch(trainingUrl),
            fetch(photoUrl),
          ]);
      
          const [trainingsData, photosData] = await Promise.all([
            trainingsResponse.json(),
            photosResponse.json(),
          ]);
      
          const enrichedTrainings = trainingsData.map(training => {
            const photo = photosData.find(photo => photo.id === training.photoId);
            return {
              ...training,
              thumbnailUrl: photo ? photo.url : null,
            };
          });
      
          const sortedTrainings = enrichedTrainings.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTrainings(sortedTrainings);
        } catch (error) {
          console.error('Error fetching trainings', error);
        }
      };
      

    const Item = ({ id, date, photoId }) => {
        const thumbnailUrl = trainings.find(training => training.id === id)?.thumbnailUrl;
      
        return (
          <TouchableOpacity
            style={theme.touchableItem}
            onPress={() => {
              const selectedTraining = trainings.find(training => training.id === id);
              navigation.navigate('TrainingHistoryDetails', { selectedTraining });
            }}
          >
            {thumbnailUrl ? (
              <Image source={{ uri: thumbnailUrl }} style={{ width: 130, height: 100 }} />
            ) : (
              <Image source={require('./testowy.png')} style={{ width: 130, height: 100 }} />
            )}
            <Text style={theme.touchableItemText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        );
      };

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

    const addTraining = () => {
      const newRouteId = 1;
      navigation.navigate('TrainingHistoryAdd', {newRouteId});
    };

    return (
        <SafeAreaView style={theme.background}>
          <View style={theme.container}>
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={addTraining}
                >
                <Text style={theme.touchableItemText}>Add new</Text>
            </TouchableOpacity>

            <FlatList
              data={trainings}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Item id={item.id} date={item.date} photoId={item.photoId} />}
            />
          </View>
        </SafeAreaView>
      );
}
