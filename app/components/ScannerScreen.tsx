import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ScannerScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);
  // Ajustamos el estado de la cámara para que se desactive al volver de la pantalla de datos escaneados.
  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(false);
      return () => {
        setIsCameraActive(false);
      };
    }, [])
  );

  // Ajustamos el estado de la cámara para que se desactive automáticamente al desmontar la pantalla.
  useEffect(() => {
    return () => {
      setIsCameraActive(false);
    };
  }, []);

  // Ajustamos el manejo de excepciones para cumplir con las mejores prácticas.
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const toggleCamera = () => {
    if (!hasPermission) {
      Alert.alert('Permiso denegado', 'No se puede activar la cámara sin permisos.');
      return;
    }
    setIsCameraActive(prev => !prev);
  };

  // Eliminamos la verificación de QR ya escaneado y mejoramos la interfaz para que se vea como una pantalla de escaneos QR.
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (isCooldownActive) {
      return;
    }

    console.log('Código escaneado:', data);
    router.push({ pathname: '/components/ScannedDataScreen', params: { scannedData: data } });

    // Activamos el cooldown por 2 segundos
    setIsCooldownActive(true);
    setTimeout(() => {
      setIsCooldownActive(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>

      <View style={styles.scannerContainer}>
        {isCameraActive ? (
          <CameraView
            style={styles.camera}
            facing='back'
            onBarcodeScanned={handleBarcodeScanned}
          />
        ) : (
          <Text style={styles.instructions}>Presiona el botón para activar la cámara y escanear un código QR</Text>
        )}
      </View>

      <TouchableOpacity className="bg-yellow-500 p-4 rounded-lg mt-4" onPress={toggleCamera}>
        <Text className="text-black text-lg font-bold text-center">
          {isCameraActive ? 'Detener Escaneo' : 'Comenzar Escaneo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-4 mt-4 bg-red-500 rounded-lg" onPress={handleLogout}>
        <Text className="text-white text-base font-bold text-center">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  camera: {
    width: 400,
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
  },
  instructions: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    margin: 20,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScannerScreen;