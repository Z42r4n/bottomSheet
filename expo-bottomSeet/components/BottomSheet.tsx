import { View, Text, Dimensions, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const Y_MAX_H = -height + (StatusBar.currentHeight || 100);

const BottomSheet = () => {
  // height shred value
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  // gesture handler
  const gusture = Gesture.Pan()
    .onStart(() => {
      // context.value = { y: translateY.value };
    })
    .onChange((event) => {
      // translateY.value = event.translationY + context.value.y;
      // translateY.value = Math.max(translateY.value, -height + (StatusBar.currentHeight || 50));
      translateY.value += event.changeY;
      translateY.value = Math.max(translateY.value, Y_MAX_H);
    });

  // animated style
  const translateYStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(
        translateY.value,
        [-height + height * 0.3, -height],
        [25, 5],
        Extrapolation.CLAMP
      ),
      transform: [{ translateY: translateY.value }],
    };
  });

  // applay animation on the start
  useEffect(() => {
    translateY.value = withSpring(-height * 0.3, { damping: 50 });
  }, []);

  return (
    <GestureDetector gesture={gusture}>
      {/* bottomSheet container */}
      <Animated.View
        style={[
          {
            backgroundColor: "white",
            position: "absolute",
            width,
            height,
            top: height,
            borderRadius: 25,
          },
          translateYStyle, // animated style
        ]}
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
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;
