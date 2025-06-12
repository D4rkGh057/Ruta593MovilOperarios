import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SessionStorage {
    static async saveSession(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem("userToken", token);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }

    static async getSession(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem("userToken");
        } catch (error) {
            console.error("Error retrieving session:", error);
            return null;
        }
    }

    static async clearSession(): Promise<void> {
        try {
            await AsyncStorage.removeItem("userToken");
        } catch (error) {
            console.error("Error clearing session:", error);
        }
    }
}
