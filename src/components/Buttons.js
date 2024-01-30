import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  console.log(props);


  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 9,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: props.color ?? "#007AFF",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });

  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}
