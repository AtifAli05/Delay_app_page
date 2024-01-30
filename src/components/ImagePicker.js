import React, { useState } from 'react';
import { Button, Image, View, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Camera } from 'expo-camera';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera permissions to make this work!');
      return false;
    }
    return true;
  };

  const openImagePicker = async () => {
    const hasPermission = await getCameraPermission();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
        Alert.alert('Error', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await getCameraPermission();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
        Alert.alert('Error', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.error('Error launching camera: ', error);
      Alert.alert('Error', 'An error occurred while using the camera.');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </View>
  );
};

export default ImagePicker;
