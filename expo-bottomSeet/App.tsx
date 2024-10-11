import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./components/BottomSheet";

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <BottomSheet />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
