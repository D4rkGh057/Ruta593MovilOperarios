import { LoginPort } from "../application/LoginUseCase";
import { User } from "../domain/User";
import { AuthService } from "./AuthService";

// Implementación simulada (mock) de autenticación
export class AuthApiAdapter implements LoginPort {
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const result = await AuthService.login(email, password);
        // Si la API solo retorna el token, puedes devolver solo el token y dejar user como null o vacío
        // Si la API retorna datos de usuario junto con el token, ajusta el mapeo aquí
        return { user: result.user ?? {}, token: result.token };
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
