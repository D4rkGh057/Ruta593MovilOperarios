import { LoginPort } from "../application/LoginUseCase";
import { User } from "../domain/User";
import { AuthService } from "./AuthService";

// Implementación simulada (mock) de autenticación
export class AuthApiAdapter implements LoginPort {
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const result = await AuthService.login(email, password);
            return { user: result.user ?? {}, token: result.token };
        } catch (error) {
            console.error("Error en AuthApiAdapter login:", error);
            throw error; // Propaga el error para que sea manejado en niveles superiores
        }
    }

    async register(email: string, password: string): Promise<{ user: User; token: string }> {
        const result = await AuthService.register({
            identificacion: "1234567890", // Proveer valores de ejemplo o dinámicos
            primer_nombre: "Nombre",
            segundo_nombre: "",
            primer_apellido: "Apellido",
            segundo_apellido: "",
            correo: email,
            password: password,
            telefono: "123456789",
            direccion: "Dirección de ejemplo"
        });
        return { user: result.user ?? {}, token: result.token };
    }
}

export default AuthApiAdapter;
