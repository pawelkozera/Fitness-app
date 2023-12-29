import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import * as FileSystem from 'expo-file-system';
import { serverConfig } from '../../config/config';

export function SaveTrainingPhoto({ route, navigation }) {
  const { theme } = useTheme();
  const { selectedTraining, totalDistance, duration, pace, calories } = route.params.trainingData;

  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const cameraRef = useRef(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      const photoUri = `${FileSystem.documentDirectory}photos/photo_${Date.now()}.jpg`;

      try {
        await FileSystem.copyAsync({
          from: photoData.uri,
          to: photoUri,
        });

        setPhoto(photoUri);
      } catch (error) {
        console.error('Error copying photo', error);
      }
    }
  };

  const savePhoto = async () => {
    try {
      const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: photo,
        }),
      });

      if (response.ok) {
        const photoInfo = await response.json();
        setPhotoId(photoInfo.id);
      } else {
        console.error('Error saving photo', response.statusText);
      }
    } catch (error) {
      console.error('Error saving photo', error);
    }
  };

  useEffect(() => {
    saveTraining();
  }, [photoId]);

  const saveTraining = async () => {
    if (photo && photoId === null) {
        await savePhoto();
    }
    
    if (photoId !== null) {
        try {
        const currentDate = new Date().toISOString().slice(0, -5);

        const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/trainings`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            trainingType: selectedTraining,
            distance: totalDistance,
            duration,
            pace,
            calories,
            date: currentDate,
            routeId: 1,
            photoId: photoId,
            }),
        });

        if (response.ok) {
            console.log('Training saved');
            navigation.navigate('MainScreenStartTraining');
        } else {
            console.error('Error training save', response.statusText);
        }
        } catch (error) {
        console.error('Error training POST', error);
        }
    }
  };

  const saveTrainingWithoutPhoto = async () => {
    try {
      const currentDate = new Date().toISOString().slice(0, -5);

      const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/trainings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingType: selectedTraining,
          distance: totalDistance,
          duration,
          pace,
          calories,
          date: currentDate,
          routeId: 1,
          photoId: photoId,
        }),
      });

      if (response.ok) {
        console.log('Training saved');
      } else {
        console.error('Error training save', response.statusText);
      }
    } catch (error) {
      console.error('Error training POST', error);
    }
  };


  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={theme.background}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
        )}
      </Camera>

      <TouchableOpacity
        style={theme.touchableItem}
        onPress={takePicture}
      >
        {!photo && (
          <Text style={theme.touchableItemText}>Take photo</Text>
        )}
        {photo && (
          <Text style={theme.touchableItemText}>Retake photo</Text>
        )}
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity
          style={theme.touchableItem}
          onPress={saveTraining}
        >
          <Text style={theme.touchableItemText}>Save</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={theme.touchableItem}
        onPress={saveTrainingWithoutPhoto}
      >
        <Text style={theme.touchableItemText}>Save without photo</Text>
      </TouchableOpacity>
    </View>
  );
}
