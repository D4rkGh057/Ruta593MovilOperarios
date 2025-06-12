import { Camera } from 'expo-camera';

// Función para verificar el permiso de la cámara
export const checkCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.getCameraPermissionsAsync();
  return status === 'granted';
};

// Función para solicitar el permiso de la cámara
export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};

export default { checkCameraPermission, requestCameraPermission };