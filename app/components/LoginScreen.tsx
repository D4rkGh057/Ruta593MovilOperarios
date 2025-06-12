import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuthStore } from "../adapters/stores/authStore";

export default function LoginScreen({ onLogin }: Readonly<{ onLogin?: () => void }>) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const loginWithCredentials = useAuthStore((state: { loginWithCredentials: (email: string, password: string) => Promise<void> }) => state.loginWithCredentials);

    const handleLogin = async () => {
        setError(null);
        try {
            await loginWithCredentials(email, password);
            if (onLogin) onLogin();
            else router.replace("/scanner");
        } catch (e: any) {
            console.info("Error al iniciar sesión:", e);
            setError(e.message ?? "Error al iniciar sesión");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "height" : "padding"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center items-center p-5 bg-white">
                    <Image
                        source={require("../../assets/images/mountain.png")}
                        className="w-280 h-93 mb-12"
                    />
                    <Image
                        source={require("../../assets/images/ruta593.png")}
                        className="w-280 h-93 mb-4"
                    />
                    <Text
                        style={{ fontFamily: "Inter" }}
                        className="text-base text-black mb-8 text-center"
                    >
                        Viajes Óptimos, Horarios Útiles y Eficientes
                    </Text>
                    <TextInput
                        className="w-80 h-14 border border-gray-300 rounded-xl p-4 mb-2 text-black"
                        placeholder="Ingresa tu Correo"
                        placeholderTextColor="#9ca3af"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <View className="w-80 h-14 border border-gray-300 rounded-xl mb-2 flex-row items-center px-4">
                        <TextInput
                            className="flex-1 text-black"
                            placeholder="Ingresa tu Contraseña"
                            placeholderTextColor="#9ca3af"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Feather
                                name={showPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#6b7280"
                            />
                        </TouchableOpacity>
                    </View>
                    {error && <Text className="text-red-500 mb-2">{error}</Text>}
                    <TouchableOpacity className="self-end mb-5">
                        <Text className="text-blue-800" style={{ fontFamily: "Inter" }}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-56 h-14 bg-yellow-400 justify-center items-center rounded-xl mb-5"
                        onPress={handleLogin}
                    >
                        <Text className="text-black" style={{ fontFamily: "Inter" }}>
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}