import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const ScannerScreen = ({ navigation }: any) => {
  const [scannedPassengers, setScannedPassengers] = useState<string[]>([]);

  const onSuccess = (e: { data: string }) => {
    const timestamp = new Date().toLocaleString();
    const passengerData = `${e.data} - ${timestamp}`;
    
    setScannedPassengers(prev => [passengerData, ...prev]);
    Alert.alert('Éxito', 'Pasajero registrado correctamente');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Escáner de Acceso</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scannerContainer}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Registro de Accesos</Text>
        <ScrollView style={styles.scrollView}>
          {scannedPassengers.map((passenger, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{passenger}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  scannerContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    margin: 10,
  },
  historyContainer: {
    flex: 1,
    padding: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyText: {
    fontSize: 14,
  },
});

export default ScannerScreen;