import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { Accelerometer, Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

export function Map({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [coordinates, setCoordinates] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
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

  const onRegionChange = (newRegion) => {
    if (isMoving) {
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { latitude: newRegion.latitude, longitude: newRegion.longitude },
      ]);
    }
  };

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={onRegionChange}
      showsUserLocation={true}
      followsUserLocation={true}
      rotateEnabled={false}
      showsMyLocationButton={false}
      provider="google"
      customMapStyle={mapStyle} 
      heading={heading}
    >
      <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
    </MapView>
  );
}

const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];
