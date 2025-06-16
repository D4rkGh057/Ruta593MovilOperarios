import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../core/domain/User";

interface SessionData {
    token: string;
    user: User;
}

export default class SessionStorage {    static async saveSession(token: string, user?: User): Promise<void> {
        try {
            console.log("Intentando guardar la sesión en AsyncStorage...");
            
            // Guardar el token
            await AsyncStorage.setItem("userToken", token);
            console.log("Token guardado:", token);
              // Guardar los datos del usuario si se proporcionan y no están vacíos
            if (user && Object.keys(user).length > 0) {
                await AsyncStorage.setItem("userData", JSON.stringify(user));
                console.log("💾 Datos del usuario guardados en AsyncStorage:", {
                    id: user.usuario_id,
                    nombre: user.primer_nombre,
                    apellido: user.primer_apellido,
                    correo: user.correo,
                    telefono: user.telefono,
                    direccion: user.direccion
                });
                
                // Guardar sesión completa como objeto
                const sessionData: SessionData = { token, user };
                await AsyncStorage.setItem("userSession", JSON.stringify(sessionData));
            } else {
                console.warn("⚠️ No se proporcionaron datos de usuario válidos para guardar");
                
                // Guardar solo el token en la sesión
                const sessionData: SessionData = { token, user: {} as User };
                await AsyncStorage.setItem("userSession", JSON.stringify(sessionData));
            }
            
            console.log("Sesión completa guardada exitosamente");
        } catch (error) {
            console.error("Error al guardar la sesión:", error);
        }
    }static async getSession(): Promise<string | null> {
        try {
            console.log("Intentando recuperar el token desde AsyncStorage...");
            const token = await AsyncStorage.getItem("userToken");
            console.log("Token recuperado desde AsyncStorage:", token);
            return token;
        } catch (error) {
            console.error("Error al recuperar la sesión:", error);
            return null;
        }
    }

    static async getUserData(): Promise<User | null> {
        try {
            console.log("Intentando recuperar datos del usuario desde AsyncStorage...");
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const user = JSON.parse(userData) as User;
                console.log("Datos del usuario recuperados:", {
                    id: user.usuario_id,
                    nombre: user.primer_nombre,
                    apellido: user.primer_apellido,
                    correo: user.correo
                });
                return user;
            }
            return null;
        } catch (error) {
            console.error("Error al recuperar los datos del usuario:", error);
            return null;
        }
    }

    static async getCompleteSession(): Promise<SessionData | null> {
        try {
            console.log("Intentando recuperar sesión completa desde AsyncStorage...");
            const sessionData = await AsyncStorage.getItem("userSession");
            if (sessionData) {
                const session = JSON.parse(sessionData) as SessionData;
                console.log("Sesión completa recuperada:", {
                    hasToken: !!session.token,
                    userId: session.user?.usuario_id,
                    userName: session.user?.primer_nombre
                });
                return session;
            }
            return null;
        } catch (error) {
            console.error("Error al recuperar la sesión completa:", error);
            return null;
        }
    }    static async clearSession(): Promise<void> {
        try {
            console.log("Limpiando sesión completa...");
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userData");
            await AsyncStorage.removeItem("userSession");
            console.log("Sesión limpiada exitosamente");
        } catch (error) {
            console.error("Error al limpiar la sesión:", error);
        }
    }
}
