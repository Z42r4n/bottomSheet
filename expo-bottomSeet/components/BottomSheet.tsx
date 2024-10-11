import { View, Text, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const BottomSheet = () => {
  return (
    // bottomSheet container
    <View
      style={{
        backgroundColor: "white",
        position: "absolute",
        width,
        height,
        top: height * 0.6,
        borderRadius: 20,
      }}
    >
      {/* gray line */}
      <View
        style={{
          backgroundColor: "gray",
          alignSelf: "center",
          width: 80,
          height: 5,
          borderRadius: 2.5,
          marginVertical: 10,
        }}
      ></View>
    </View>
  );
};

export default BottomSheet;
