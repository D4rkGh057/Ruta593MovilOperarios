import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index" // Aseguramos que la ruta inicial sea "index"
      />
    </SafeAreaProvider>
  );
}