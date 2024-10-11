import { View, Text, Dimensions, StatusBar } from "react-native";
import React, { useCallback, useEffect } from "react";
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
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  // function to scroll with spring animation
  const scrollTo = useCallback((dest: number) => {
    "worklet";
    translateY.value = withSpring(dest, { damping: 50 });
  }, []);

  // gesture handler
  const gesture = Gesture.Pan()
    .onStart(() => {
      // Store the current translation value at the start of the gesture
      // context.value = { y: translateY.value };
    })
    .onChange((event) => {
      translateY.value += event.changeY;
      translateY.value = Math.max(translateY.value, Y_MAX_H);
    })
    .onEnd(() => {
      if (translateY.value > -height / 3) {
        scrollTo(-10); // Close the bottom sheet
      } else if (translateY.value < -height / 1.5) {
        scrollTo(Y_MAX_H); // Fully open the bottom sheet
      }
    });

  // applay animation on the start
  useEffect(() => {
    scrollTo(-height * 0.3);
  }, []);

  // Animated style for translateY
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

  return (
    <GestureDetector gesture={gesture}>
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
            marginVertical: 15,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;
