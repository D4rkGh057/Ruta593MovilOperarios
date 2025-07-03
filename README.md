# Ruta593 Móvil Operarios 🚌

Aplicación móvil para operarios del sistema de transporte Ruta593, desarrollada con React Native y Expo. Esta aplicación permite a los operarios validar boletos digitales mediante código QR y gestionar información de pasajeros.

## 📱 Descripción del Proyecto

Ruta593 Móvil Operarios es una aplicación diseñada específicamente para el personal operativo del sistema de transporte público Ruta593. La aplicación permite:

- **Autenticación segura** de operarios
- **Escaneo de códigos QR** para validar boletos digitales
- **Verificación del estado de pago** de los boletos
- **Interfaz intuitiva** optimizada para dispositivos móviles
- **Gestión de sesiones** con almacenamiento persistente

## 📁 Estructura de Carpetas

```
app/
├── adapters/
│   └── stores/                 # Gestión de estado con Zustand
│       ├── authStore.ts        # Estado de autenticación
│       ├── busStore.ts         # Estado de buses
│       ├── frecuenciaStore.ts  # Estado de frecuencias
│       ├── paradaStore.ts      # Estado de paradas
│       └── SessionStorage.ts   # Almacenamiento de sesión
├── components/                 # Componentes reutilizables
│   ├── LoginScreen.tsx         # Pantalla de inicio de sesión
│   ├── ScannedDataScreen.tsx   # Pantalla de validación de QR
│   └── ScannerScreen.tsx       # Pantalla del escáner QR
├── config/
│   └── api.ts                  # Configuración de endpoints
├── core/
│   ├── application/            # Casos de uso
│   │   └── LoginUseCase.ts     # Lógica de autenticación
│   ├── domain/                 # Entidades del dominio
│   │   ├── Auth.ts
│   │   ├── Boleto.ts
│   │   ├── Bus.ts
│   │   ├── User.ts
│   │   └── ...                 # Otras entidades
│   └── infrastructure/         # Servicios e infraestructura
│       ├── AuthApiAdapter.ts   # Adaptador de autenticación
│       ├── AuthService.ts      # Servicio de autenticación
│       └── ...                 # Otros servicios
├── navigation/
│   └── AppNavigator.tsx        # Configuración de navegación
├── utils/
│   └── permissions.ts          # Manejo de permisos
├── _layout.tsx                 # Layout principal
├── index.tsx                   # Pantalla de inicio
├── login.tsx                   # Pantalla de login
└── scanner.tsx                 # Pantalla del escáner
```

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para emulador Android) o Xcode (para iOS)

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Ruta593MovilOperarios
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Editar `app/config/api.ts` con la IP correcta del servidor

## 📦 Dependencias Principales

### Framework y UI
- **React Native** `0.79.4` - Framework de desarrollo móvil
- **Expo** `53.0.13` - Plataforma de desarrollo
- **NativeWind** `4.1.23` - Estilos con Tailwind CSS

### Navegación y Estado
- **Expo Router** `5.1.1` - Enrutamiento basado en archivos
- **Zustand** `5.0.5` - Gestión de estado global
- **AsyncStorage** `2.1.2` - Almacenamiento persistente

### Funcionalidades Específicas
- **Expo Camera** `16.1.9` - Cámara y escáner QR
- **Expo Barcode Scanner** `13.0.1` - Lectura de códigos QR
- **Lottie React Native** `7.2.2` - Animaciones
- **Expo Vector Icons** `14.1.0` - Iconografía

### Desarrollo
- **TypeScript** - Tipado estático
- **ESLint** - Linting de código
- **Tailwind CSS** - Framework de estilos

## ▶️ Ejecución

### Desarrollo

1. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   # o
   npx expo start
   ```

2. **Ejecutar en Android**
   ```bash
   npm run android
   # o
   npx expo run:android
   ```

3. **Ejecutar en iOS**
   ```bash
   npm run ios
   # o
   npx expo run:ios
   ```

4. **Ejecutar en web**
   ```bash
   npm run web
   # o
   npx expo start --web
   ```

### Desarrollo con Expo Go

1. Instalar Expo Go en tu dispositivo móvil
2. Ejecutar `npm start`
3. Escanear el código QR con Expo Go

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en navegador web
- `npm run lint` - Ejecuta el linter

## 🔧 Configuración

### API
Configurar la dirección IP del servidor en `app/config/api.ts`:

```typescript
export const IP = "TU_IP_AQUI";
export const API_BASE_URL = `http://${IP}:3000/api`;
```

### Permisos
La aplicación requiere permisos de cámara para el escaneo de códigos QR. Estos se configuran automáticamente en el archivo `app.json`.

## 🏗️ Arquitectura

La aplicación sigue los principios de **Arquitectura Hexagonal** (Clean Architecture):

- **Domain**: Entidades y reglas de negocio
- **Application**: Casos de uso y lógica de aplicación
- **Infrastructure**: Adaptadores, servicios y detalles técnicos
- **Presentation**: Componentes UI y gestión de estado

## 📱 Funcionalidades

### Autenticación
- Inicio de sesión con email y contraseña
- Gestión segura de tokens JWT
- Persistencia de sesión

### Validación de Boletos
- Escaneo de códigos QR
- Verificación del estado de pago
- Animación de validación visual
- Feedback inmediato al operario

### Gestión de Estado
- Estado global con Zustand
- Almacenamiento persistente con AsyncStorage
- Sincronización automática

## 🛠️ Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request
