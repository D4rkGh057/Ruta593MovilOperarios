import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectionScreen() {
    const router = useRouter();

    const handleOperarioPress = () => {
        router.push("/scanner");
    };

    const handleChoferPress = () => {
        router.push("/chofer");
    };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
            <View className="w-full justify-center mt-8">
                <View className="ml-12">
                    <Image
                        source={require("../../assets/images/ruta593.png")}
                        style={{ width: 280, height: 93 }}
                    />
                </View>
                <Text
                    style={{ fontFamily: "Inter" }}
                    className="text-xl text-black mt-4 text-center font-semibold"
                >
                    Selecciona tu rol
                </Text>
                <Text
                    style={{ fontFamily: "Inter" }}
                    className="text-sm text-gray-600 mt-2 text-center"
                >
                    Elige cómo quieres acceder al sistema
                </Text>
            </View>
            
            <View className="flex-1 justify-center items-center w-full space-y-6 gap-8">
                <TouchableOpacity
                    className="w-full max-w-xs bg-blue-500 rounded-xl py-6 items-center shadow-lg"
                    onPress={handleOperarioPress}
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-xl font-semibold mb-2" style={{ fontFamily: "Inter" }}>
                        👨‍🔧 Operario
                    </Text>
                    <Text className="text-blue-100 text-sm text-center px-4" style={{ fontFamily: "Inter" }}>
                        Escanear códigos QR y gestionar boletos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full max-w-xs bg-green-500 rounded-xl py-6 items-center shadow-lg"
                    onPress={handleChoferPress}
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-xl font-semibold mb-2" style={{ fontFamily: "Inter" }}>
                        🚌 Chofer
                    </Text>
                    <Text className="text-green-100 text-sm text-center px-4" style={{ fontFamily: "Inter" }}>
                        Gestionar rutas y frecuencias
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                className="w-full max-w-xs bg-gray-200 rounded-xl py-3 mb-12 items-center"
                onPress={() => router.back()}
                activeOpacity={0.8}
            >
                <Text className="text-gray-700 text-lg" style={{ fontFamily: "Inter" }}>
                    Volver
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
