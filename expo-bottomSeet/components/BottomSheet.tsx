import { View, Text, Dimensions, StatusBar } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const Y_MAX_H = -height + (StatusBar.currentHeight || 100);
const snap = [70, 400, 700];

export type ButtomSheetRefProps = {
  scrollTo: (dest: number) => void;
};

type ButtomSheet = {
  children?: React.ReactNode;
};

const BottomSheet = forwardRef<ButtomSheetRefProps, ButtomSheet>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    // function to scroll with spring animation
    const scrollTo = useCallback((dest: number, duration: number = 500) => {
      "worklet";
      translateY.value = withSpring(dest, {
        damping: 50,
        stiffness: 300,
        // easing: Easing.inOut(Easing.ease)
        // damping: 50,
      });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

    // gesture handler
    const gesture = Gesture.Pan()
      .onChange((event) => {
        translateY.value = Math.max(translateY.value + event.changeY, Y_MAX_H);
      })
      .onEnd((event) => {
        const y = translateY.value;
        const snapTo = (index: number) => scrollTo(-snap[index]);
        const RANGE = 30; // Range around each snap point

        for (let i = snap.length - 1; i >= 0; i--) {
          const snapPoint = -snap[i]; // Get the current snap point (negated for translationY)
          const upperBound = snapPoint + RANGE; // 30 points above the snap point
          const lowerBound = snapPoint - RANGE; // 30 points below the snap point

          // Check if we're within the range of this snap point
          if (y < lowerBound) {
            // Gesture going downwards (negative translationY)
            const nextSnap = event.translationY > 0 ? i : i + 1;
            snapTo(Math.min(nextSnap, snap.length - 1)); // Ensure we don't exceed array bounds
            return;
          } else if (y >= lowerBound && y <= upperBound) {
            // If we're within the range of this snap point, snap to it
            snapTo(i);
            return;
          }
        }

        // Default to the first snap point if we're above the highest snap
        snapTo(0);
      });
    // applay animation on the start
    useEffect(() => {
      scrollTo(-snap[0]);
    }, []);

    // Animated style for translateY
    const translateYStyle = useAnimatedStyle(() => {
      return {
        borderRadius: interpolate(
          translateY.value,
          [-height + height * 0.3, -height],
          [25, 0],
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
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default BottomSheet;
