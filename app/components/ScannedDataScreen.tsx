import { useLocalSearchParams, useRouter, } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ScannedDataScreen = () => {
  const router = useRouter();
  const { scannedData } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Text className="text-2xl font-bold mb-5 text-gray-800">Datos Escaneados</Text>
      <View className="bg-white p-4 rounded-lg border border-gray-300 mb-5">
        <Text className="text-base text-gray-600">{scannedData}</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={() => router.back()}
      >
        <Text className="text-white text-lg font-bold">Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScannedDataScreen;
