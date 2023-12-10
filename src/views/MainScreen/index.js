import MapView, { Polyline } from 'react-native-maps';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, Button, View, TouchableOpacity } from 'react-native';
import { Accelerometer, Magnetometer } from 'expo-sensors';
import haversine from 'haversine';
import * as Location from 'expo-location';
import { useTheme } from '../../context/ThemeContext';
import { SelectList } from 'react_native_simple_dropdown_select_list';

export function MainScreen({ navigation }) {
  const {theme} = useTheme();
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [totalDistance, setTotalDistance] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [pace, setPace] = useState(0.0);
  const [calories, setCalories] = useState(0.0);

  const [selectedTraining, setSelectedTraining] = useState('running');

  const trainingOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
  ];

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
  const [lastLocation, setLastLocation] = useState(null);

  const accelerometerSubscription = useRef(null);
  const magnetometerSubscription = useRef(null);

  let startTime = Date.now();
  let intervalId;
  let intervalIdGetLocation;

  const startTraining = () => {
    setIsTrainingStarted(true);
    setTotalDistance(0.0);
    setCoordinates([]);
    setDuration(0.0);
    setCoordinates([]);
    startTime = Date.now();

    intervalId = setInterval(updateTraining, 500);
    intervalIdGetLocation = setInterval(getLocationWhenTrainingStarted, 5000);
  };

  const stopTraining = () => {
    setIsTrainingStarted(false);
    clearInterval(intervalId);
    clearInterval(intervalIdGetLocation);
  };

  const updateTraining = () => {
    if (isTrainingStarted) {
      updateTrainingData(startTime);
    }
  };

  const updateTrainingData = (startTime) => {
    const currentTime = new Date().getTime();
    const elapsedSeconds = (currentTime - startTime) / 1000;
    setDuration(elapsedSeconds);

    const currentPace = totalDistance / elapsedSeconds;
    setPace(currentPace);

    const currentCalories = calculateCalories(totalDistance);
    setCalories(currentCalories);
  };

  const calculateCalories = (distance) => {
    return distance * 0.5;
  };

  const getLocationWhenTrainingStarted = async () => {
    if (isTrainingStarted) {
      getLocation();
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: currentZoom / 2,
        longitudeDelta: (currentZoom / 2) * (DeviceWidth / DeviceHeight),
      });

      const newLocation = { latitude, longitude };

      if (lastLocation) {
        const distanceCovered = haversine(lastLocation, newLocation, { unit: 'km' });
        setTotalDistance((prevDistance) => prevDistance + distanceCovered);
      }

      setCoordinates((prevCoordinates) => [...prevCoordinates, newLocation]);
      setLastLocation(newLocation);

      setLastLocation({ latitude, longitude });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  if (firstRun) {
    setFirstRun(false);
    getLocation();
  }

  useEffect(() => {
    accelerometerSubscription.current = Accelerometer.addListener(({ x, y, z }) => {
      const movementThreshold = 1.2;
      const isDeviceMoving = Math.abs(x) > movementThreshold || Math.abs(y) > movementThreshold || Math.abs(z) > movementThreshold;
      setIsMoving(isDeviceMoving);
    });

    magnetometerSubscription.current = Magnetometer.addListener(({ x, y, z }) => {
      const newHeading = Math.round((Math.atan2(y, x) * 180) / Math.PI);
      setHeading(newHeading >= 0 ? newHeading : newHeading + 360);
    });

    intervalId = setInterval(updateTraining, 500);
    intervalIdGetLocation = setInterval(getLocationWhenTrainingStarted, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdGetLocation);
      accelerometerSubscription.current && accelerometerSubscription.current.remove();
      magnetometerSubscription.current && magnetometerSubscription.current.remove();
    };
  }, [isTrainingStarted]);

  const onRegionChangeComplete = (newRegion) => {
    if (isMoving && isTrainingStarted) {
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

  const trainingButton = () => {
    if (isTrainingStarted) {
      stopTraining();
    } else {
      startTraining();
    }
  };

  return (
    <View style={theme.background}>
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

      <View style={[theme.container, {flex:0.5, borderTopLeftRadius: 0,borderTopRightRadius: 0, padding: 0}]}>
        { (!isTrainingStarted) && (
            <SelectList
            //requireds
            data={trainingOptions}
            whatWithSelected={value => setSelectedTraining(value)}
            maxHeightList={150}
            placeholder={selectedTraining}
            notFoundText="Date not found"
            valueToBeSaved="key"
            //optionals
            afterSelecting={() => console.log('return function')}
            containerStyle={{ width: 200, borderColor: 'black' }}
            containerDataStyle={{ width: 200, borderColor: 'gray' }}
            infoFontStyle={{ fontSize: 18, fontWeight: 'bold' }}
            containerFontsStyle={{ fontSize: 18, fontWeight: 'normal' }}
          />
          )
        }

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          <Text style={theme.text}> Distance: {totalDistance.toFixed(2)} km </Text>
          <Text style={theme.text}> Duration: {duration.toFixed(2)} s </Text>
          <Text style={theme.text}> Pace: {pace.toFixed(2)} km/h </Text>
          <Text style={theme.text}> Calories: {calories.toFixed(2)} kcal </Text>
        </View>
        <TouchableOpacity
          style={theme.touchableItem}
          onPress={trainingButton}
        >
          <Text style={theme.touchableItemText}>{isTrainingStarted ? 'Stop Training' : 'Start Training'}</Text>
        </TouchableOpacity>
        {(duration != 0 && !isTrainingStarted) && (  
          <View>
            <TouchableOpacity
              style={theme.touchableItem}
              onPress={() => {
                
              }}
            >
              <Text style={theme.touchableItemText}>Save route</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={theme.touchableItem}
              onPress={() => {
                
              }}
            >
              <Text style={theme.touchableItemText}>Save training</Text>
            </TouchableOpacity>
          </View>
        )}
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
