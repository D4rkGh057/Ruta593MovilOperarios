import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ScannerScreen from "./components/ScannerScreen";
import { checkCameraPermission, requestCameraPermission } from "./utils/permissions";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    checkCameraPermissionHandler();
  }, []);

  const checkCameraPermissionHandler = async () => {
    try {
      const result = await checkCameraPermission();
      console.log('Resultado de verificación de permiso:', result);

      if (result) {
        console.log('Permiso de cámara concedido');
        setHasPermission(true);
      } else {
        console.log('Solicitando permiso de cámara...');
        const requestResult = await requestCameraPermission();
        console.log('Resultado de solicitud de permiso:', requestResult);

        if (requestResult) {
          console.log('Permiso de cámara concedido después de solicitud');
          setHasPermission(true);
        } else {
          console.log('Permiso de cámara denegado después de solicitud');
          showPermissionAlert("Permiso denegado", "Necesitamos acceso a la cámara para escanear códigos QR. Por favor, habilita el permiso en la configuración de tu dispositivo.");
        }
      }
    } catch (error) {
      console.error('Error al manejar permisos:', error);
      showPermissionAlert("Error", "Ocurrió un error al verificar los permisos de la cámara. Por favor, intenta nuevamente.");
      setHasPermission(false);
    }
  };

  const showPermissionAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => setHasPermission(false),
        },
      ]
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen 
        options={{
          title: "Escanear QR",
          headerShown: true,
        }} 
      />
      {hasPermission === null ? (
        <Text className="text-lg">Solicitando permiso de cámara...</Text>
      ) : hasPermission ? (
        <ScannerScreen 
          checkCameraPermissionHandler={checkCameraPermissionHandler}
          setHasPermission={setHasPermission}
          hasPermission={hasPermission}
          setIsCameraActive={() => {}}
          isCameraActive={true} // Asumiendo que el escáner está activo por defecto
          setScannedPassengers={() => {}}
          scannedPassengers={[]}
          isScanning={false}
          setIsScanning={() => {}}
          onSuccess={() => {}}
          handleLogout={() => {}}
          navigation={{ replace: () => {} }} // Mock de navegación
        />
      ) : (
        <View className="items-center">
          <Text className="text-lg text-red-500 mb-4">Sin acceso a la cámara</Text>
          <TouchableOpacity 
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={checkCameraPermissionHandler}
          >
            <Text className="text-white">Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
