import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState({
    latitude: 65.08,
    longitude: 25.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserPosition = async () => {
   let { status } = await Location.requestForegroundPermissionsAsync()
    try {
      if (status !== "granted") {
        console.log("Location failed");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.log("error getting location");
    }
  };

  useEffect(() => {
    (async () => {
      getUserPosition();
    })()
  }, [])

  return (
    <>
      <MapView style={styles.map} region={location} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
