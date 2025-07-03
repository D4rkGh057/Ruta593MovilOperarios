import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
            <View className="w-full justify-center mt-8">
                <View className="ml-12">
                    <Image
                        source={require("../assets/images/ruta593.png")}
                        style={{ width: 280, height: 93 }}
                    />
                </View>
                <Text
                    style={{ fontFamily: "Inter" }}
                    className="text-base text-black mt-2 text-center"
                >
                    Bienvenido
                </Text>
                <Text
                    style={{ fontFamily: "Inter" }}
                    className="text-sm text-gray-600 mt-2 text-center"
                >
                    Empezemos un nuevo viaje.
                </Text>
            </View>
            <View className="flex-1 justify-center items-center w-full">
                <Image
                    source={require("../assets/images/mountain.png")}
                    className="w-280 h-93 bg-contain"
                />
            </View>
            <TouchableOpacity
                className="w-full max-w-xs bg-yellow-300 rounded-xl py-4 mb-12 items-center"
                onPress={() => router.push("/login")}
                activeOpacity={0.8}
            >
                <Text className="text-black text-lg" style={{ fontFamily: "Inter" }}>
                    Comenzar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
