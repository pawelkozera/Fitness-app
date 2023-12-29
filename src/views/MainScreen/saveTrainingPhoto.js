import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';

export function SaveTrainingPhoto({ route, navigation }) {
    const { theme } = useTheme();

    const [hasPermission, setHasPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();
            setPhoto(photoData.uri);
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
            <Text style={theme.touchableItemText}>Take photo</Text>
        </TouchableOpacity>
        
        {photo && (
            <TouchableOpacity
                style={theme.touchableItem}
                onPress={() => {}}
                >
                <Text style={theme.touchableItemText}>Save</Text>
            </TouchableOpacity>
        )}

        <TouchableOpacity
            style={theme.touchableItem}
            onPress={() => {}}
            >
            <Text style={theme.touchableItemText}>Save without photo</Text>
        </TouchableOpacity>
    </View>
  );
}