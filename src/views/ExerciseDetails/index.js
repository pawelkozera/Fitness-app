import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { serverConfig } from '../../config/config';

import airborneImg from './imgs/airborne.jpg';
import artemisImg from './imgs/artemis.jpg';
import amazonImg from './imgs/amazon.jpg';
import armoryImg from './imgs/armory.jpg';
import athenaImg from './imgs/athena.jpg';
import baconImg from './imgs/bacon.jpg';
import bansheeImg from './imgs/banshee.jpg';
import boxerabsImg from './imgs/boxerabs.jpg';
import codexImg from './imgs/codex.jpg';

const imageMap = {
  airborne: airborneImg,
  artemis: artemisImg,
  amazon: amazonImg,
  armory: armoryImg,
  athena: athenaImg,
  bacon: baconImg,
  banshee: bansheeImg,
  boxerabs: boxerabsImg,
  codex: codexImg
};

export function ExerciseDetails({ route, navigation }) {
  const { theme } = useTheme();
  const { exerciseDetails } = route.params;

  const selectedImage = imageMap[exerciseDetails.imgName];
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const setTimer = (duration) => {
    setSeconds(duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <Image source={selectedImage} style={styles.image} />
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>

          <TouchableOpacity style={styles.button} onPress={() => setTimer(30)}>
            <Text>30s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setTimer(60)}>
            <Text>1m</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setTimer(120)}>
            <Text>2m</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    marginBottom: 100,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#059669',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: 50,
  },
  timerText: {
    marginTop: 10,
    marginRight: 30,
  },
});
