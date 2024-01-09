import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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

  return (
    <View style={theme.background}>
      <View style={theme.container}>
        <Image source={selectedImage} style={styles.image} />
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
});
