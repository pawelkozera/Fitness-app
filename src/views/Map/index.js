import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useEffect, useState } from 'react';

export function Map({ navigation }) {
  const Map = () => {
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
      const mockLocation = { latitude: 37.7749, longitude: -122.4194 };
      setRegion({ ...region, ...mockLocation });
    }, []);

    const onRegionChange = (newRegion) => {
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { latitude: newRegion.latitude, longitude: newRegion.longitude },
      ]);
    };

    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={onRegionChange}
      >
        <Marker coordinate={region} title="Your Location" />
        <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
      </MapView>
    );
  };

  return <Map />;
}
