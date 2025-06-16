import { useLocalSearchParams, useRouter, } from 'expo-router';
import LottieView from "lottie-react-native";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ScannedDataScreen = () => {
  const router = useRouter();
  const { scannedData } = useLocalSearchParams();

  const isValid = (() => {
    if (typeof scannedData !== "string") return false;
    try {
      const parsedData = JSON.parse(scannedData);
      return parsedData?.estado === "pagado";
    } catch {
      return false;
    }
  })();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      {isValid ? (
        <View className="items-center">
          <LottieView
            source={require("../../assets/animations/check.json")}
            autoPlay
            loop={false}
            style={{ width: 150, height: 150 }}
          />
          <Text className="text-2xl font-bold mt-5 text-green-600">Validado</Text>
        </View>
      ) : (
        <Text className="text-2xl font-bold mb-5 text-red-600">Escaneo inválido</Text>
      )}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mt-5"
        onPress={() => router.back()}
      >
        <Text className="text-white text-lg font-bold">Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScannedDataScreen;
