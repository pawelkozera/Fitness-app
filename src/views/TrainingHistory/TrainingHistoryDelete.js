import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';
import { serverConfig } from '../../config/config';
import { styles } from "./style";
import * as FileSystem from 'expo-file-system';

export function TrainingHistoryDelete({ route, navigation }) {
    const { theme } = useTheme();
    const [selectedTraining, setSelectedTraining] = useState(route.params.selectedTraining);
    const [photoDetails, setPhotoDetails] = useState(null);

    const deleteTraining = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/trainings/${selectedTraining.id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log("Deleting training successfully");
            } else {
                console.error('Error deleting training', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting training', error);
        }
    };

    const deletePhotos = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/photos/${selectedTraining.photoId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log("Deleting photos successfully");
            } else {
                console.error('Error deleting photos:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting photos', error);
        }
    };    

    const deletePhotoFromDevice = async (photoUrl) => {
        try {
          await FileSystem.deleteAsync(photoUrl);
          console.log('Photo deleted successfully');
        } catch (error) {
          console.error('Error deleting photo', error);
        }
      };

    const deleteRoute = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/routes/${selectedTraining.routeId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log("Deleting route successfully");
            } else {
                console.error('Error deleting route', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting route', error);
        }
    };

    const fetchPhotoDetails = async (photoId) => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/photos/${photoId}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching training details', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPhotoDetails(selectedTraining.photoId);
                setPhotoDetails(data);
            } catch (error) {
                console.error('Error fetching training details', error);
            }
        };
    
        fetchData();
    }, [selectedTraining.photoId]);

    const deleteWithRoute = () => {
        deleteTraining();
        if (selectedTraining.photoId !== null) {
            deletePhotos();
            deletePhotoFromDevice(photoDetails.url);
        }
        deleteRoute();
        navigation.navigate('TrainingHistoryList');
    };

    const deleteWithoutRoute = () => {
        deleteTraining();
        if (selectedTraining.photoId !== null) {
            deletePhotos();
            deletePhotoFromDevice(photoDetails.url);
        }
        navigation.navigate('TrainingHistoryList');
    };

  return (
    <View style={theme.background}>
        <View style={[theme.container]}>
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={deleteWithRoute}
                >
                <Text style={theme.touchableItemText}>Delete with route</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={theme.touchableItem}
                onPress={deleteWithoutRoute}
                >
                <Text style={theme.touchableItemText}>Delete without route</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const mapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];