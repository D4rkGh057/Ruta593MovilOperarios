import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SessionStorage from "./app/adapters/stores/SessionStorage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const token = await SessionStorage.getSession();
      if (token) {
        router.replace("/scanner"); // Redirige a la pantalla principal si hay sesión
      } else {
        router.replace("/login"); // Redirige a la pantalla de login si no hay sesión
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  if (isLoading) {
    return null; // Puedes agregar un componente de carga aquí
  }

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