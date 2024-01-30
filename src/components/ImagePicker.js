import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "./Button";
import ImageViewer from "./ImageViewer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const PlaceholderImage = require("../../assets/favicon.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState([]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple selection
    });
    console.log(result);
    if (result.assets.length > 0) {
      setSelectedImage(result.assets.map((item) => item.uri));
    } else {
      alert("You did not select any image.");
    }
  };

  const captureImageAsync = async () => {
    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera access is required to take pictures."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage((prev)=>{
        const state=[...prev]
        state.push(result.assets[0])
        return state
      });
    } else {
      alert("You did not take any photo.");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };
  console.log(selectedImage, "[[[[[[[");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage.length>0&& selectedImage.map((i) => {
          return (
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={i}
            />
          );
        })}
      </View>

      <View style={styles.footerContainer}>
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
          ]}
        >
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={pickImageAsync}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              Choose a Photo
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
          ]}
        >
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={captureImageAsync}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              Takes a Photo
            </Text>
          </Pressable>
        </View>

        {/* {selectedImage && (
          <Button theme="primary" label="Remove Photo" onPress={removeImage} />
        )} */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 58,
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginLeft: 8,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
