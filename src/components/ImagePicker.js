import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
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
      setSelectedImage((prev) => [
        ...result.assets.map((item) => item.uri),
      ]);
    } else {
      alert("You did not take any photo.");
    }
  };

  const removeImage = () => {
    setSelectedImage([]);
  };
  console.log(selectedImage, "[[[[[[[");
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {selectedImage.length > 0 &&
          selectedImage.map((i) => {
            return (
              <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={i}
              />
            );
          })}
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={pickImageAsync}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              Choose Photo
            </Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={captureImageAsync}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              Takes Photo
            </Text>
          </Pressable>
        </View>

        {/* {selectedImage && (
          <Button theme="primary" label="Remove Photo" onPress={removeImage} />
        )} */}
        {selectedImage.length > 0 && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={removeImage}
            >
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
                Remove Photo
              </Text>
            </Pressable>
          </View>
        )}
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
    paddingVertical: 4,
    flexDirection: "row",
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    display:'flex',
    width: 115,
    height: 35,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    borderWidth: 1.4,
    marginLeft:3
  },
  button: {
    borderRadius: 5,
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
