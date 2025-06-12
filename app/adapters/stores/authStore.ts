// app/adapters/stores/authStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginUseCase } from "../../core/application/LoginUseCase";
import { User } from "../../core/domain/User";
import { AuthApiAdapter } from "../../core/infrastructure/AuthApiAdapter";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loginWithCredentials: (email: string, password: string) => Promise<void>;
    registerWithCredentials: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const loginUseCase = new LoginUseCase(new AuthApiAdapter());

const zustandStorageAdapter = {
    getItem: async (name: string) => {
        const value = await AsyncStorage.getItem(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: async (name: string, value: any) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: async (name: string) => {
        await AsyncStorage.removeItem(name);
    },
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            loginWithCredentials: async (email, password) => {
                const { user, token } = await loginUseCase.execute(email, password);
                set({ user, token, isAuthenticated: true });
            },

            registerWithCredentials: async (email, password) => {
                const { user, token } = await loginUseCase.executeRegister(email, password);
                set({ user, token, isAuthenticated: true });
            },

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage", // clave para async-storage
            storage: zustandStorageAdapter, // adaptador compatible
            onRehydrateStorage: () => (state) => {
                if (!state) {
                    console.warn("No se pudo rehidratar el estado desde el almacenamiento persistente.");
                }
            },
        }
    )
);
