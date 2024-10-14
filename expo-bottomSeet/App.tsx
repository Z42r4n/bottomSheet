import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { ButtomSheetRefProps } from "./components/BottomSheet";
import { useCallback, useRef } from "react";

export default function App() {
  const sheetRef = useRef<ButtomSheetRefProps>(null);
  const onPress = useCallback(() => {
    sheetRef.current?.scrollTo(-500);
  }, []);
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheet ref={sheetRef}>
          <View style={styles.content}></View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    opacity: 0.5,
    backgroundColor: "yellow",
  },
  content: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
