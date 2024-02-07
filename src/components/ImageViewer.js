import { StyleSheet, Image,View } from "react-native";
const PlaceholderImagee = require("../../assets/favicon.png");

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  console.log(placeholderImageSource,"placeholderImageSource");
  const imageSource = selectedImage
    ? { uri: selectedImage }
    :{ uri: PlaceholderImagee};

  return (
    <View style={{marginHorizontal:2}}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 70,
    borderRadius: 10,
  },
});
 