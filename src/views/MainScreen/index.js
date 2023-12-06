import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, Button, View } from 'react-native';
import { Accelerometer, Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

export function MainScreen({ navigation }) {
	const [distance, setDistance] = useState(0.0);
	const [duration, setDuration] = useState(0.0);
	const [pace, setPace] = useState(0.0);
	const [calories, setCalories] = useState(0.0);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [coordinates, setCoordinates] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [heading, setHeading] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(0.002); 

  
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        await Location.enableNetworkProviderAsync();

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const { latitude, longitude } = location.coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: currentZoom / 2,
          longitudeDelta: (currentZoom / 2) * (DeviceWidth / DeviceHeight),
        });

        setCoordinates([{ latitude, longitude }]);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

  getLocation();

  const accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
    const movementThreshold = 1.5;
    const isDeviceMoving = Math.abs(x) > movementThreshold || Math.abs(y) > movementThreshold || Math.abs(z) > movementThreshold;

    setIsMoving(isDeviceMoving);
  });

  const magnetometerSubscription = Magnetometer.addListener(({ x, y, z }) => {
    const newHeading = Math.round((Math.atan2(y, x) * 180) / Math.PI);
    setHeading(newHeading >= 0 ? newHeading : newHeading + 360);
  });

  return () => {
    accelerometerSubscription.remove();
    magnetometerSubscription.remove();
  };
}, []);

  const onRegionChangeComplete = (newRegion) => {
    if (true) {
      setRegion({
        ...newRegion,
        latitudeDelta: currentZoom / 2,
        longitudeDelta: (currentZoom / 2) * (DeviceWidth / DeviceHeight),
      });
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { latitude: newRegion.latitude, longitude: newRegion.longitude },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 0.5 }}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        rotateEnabled={false}
        showsMyLocationButton={false}
        provider="google"
        customMapStyle={mapStyle}
        heading={heading}
        zoomEnabled={false}
        zoomControlEnabled={false}
        scrollEnabled={false}
      >
        <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
      </MapView>

      <View style={{ flex: 0.5, padding: 16 }}>
        <Text> Distance: {distance} </Text>
        <Text> Duration: {duration} </Text>
        <Text> Pace: {pace} </Text>
        <Text> Calories: {calories} </Text>
        <Button title="Start training" onPress={() => console.log('start training')} />
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

const DeviceHeight = Dimensions.get('window').height;
const DeviceWidth = Dimensions.get('window').width;
