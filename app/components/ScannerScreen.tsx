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
import { BoletoService } from '../core/infrastructure/BoletoService';

const ScannerScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  
  const boletoService = new BoletoService();

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

  // Función para validar boleto cuando se escanea el QR
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (isCooldownActive) {
      return;
    }

    console.log('Código escaneado:', data);
    
    try {
      // Activar cooldown inmediatamente para evitar escaneos múltiples
      setIsCooldownActive(true);
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        Alert.alert('Error', 'El código QR escaneado no es válido.');
        setTimeout(() => setIsCooldownActive(false), 2000);
        return;
      }
      console.log('ID del boleto:', parsedData.boleto_id);
      // Primero verificar si el boleto existe y obtener su estado
      const boleto = await boletoService.getBoletoById(parsedData.boleto_id);
      
      if (!boleto) {
        Alert.alert('Error', 'Boleto no encontrado');
        setTimeout(() => setIsCooldownActive(false), 2000);
        return;
      }
      
      // Verificar si el boleto ya está validado
      if (boleto.estado === 'validado' || boleto.estado === 'usado') {
        Alert.alert(
          'Boleto ya validado', 
          `Este boleto ya fue validado anteriormente.\n\nPasajero: ${boleto.usuario?.primer_nombre ?? 'N/A'} ${boleto.usuario?.primer_apellido ?? ''}\nEstado: ${boleto.estado}`
        );
        setTimeout(() => setIsCooldownActive(false), 2000);
        return;
      }
      
      // Si el boleto no está validado, proceder a validarlo
      await boletoService.validateBoleto(parsedData.boleto_id);
      
      Alert.alert(
        'Boleto validado exitosamente', 
        `El boleto ha sido validado correctamente.\n\nPasajero: ${boleto.usuario?.primer_nombre ?? 'N/A'} ${boleto.usuario?.primer_apellido ?? ''}\nAsientos: ${boleto.asientos ?? 'N/A'}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Opcional: navegar a la pantalla de datos escaneados
              router.push({ pathname: '/components/ScannedDataScreen', params: { scannedData: data } });
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Error al procesar boleto:', error);
      Alert.alert('Error', 'No se pudo procesar el boleto. Intenta nuevamente.');
    } finally {
      // Desactivar cooldown después de 3 segundos
      setTimeout(() => {
        setIsCooldownActive(false);
      }, 3000);
    }
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
          <Text style={styles.instructions}>Presiona el botón para activar la cámara y escanear boletos QR para validarlos</Text>
        )}
      </View>

      <TouchableOpacity className="bg-yellow-500 p-4 rounded-lg mt-4" onPress={toggleCamera}>
        <Text className="text-black text-lg font-bold text-center">
          {isCameraActive ? 'Detener Validación' : 'Comenzar Validación de Boletos'}
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