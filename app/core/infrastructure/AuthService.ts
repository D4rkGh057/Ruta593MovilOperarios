import { API_ENDPOINTS } from "../../config/api";

// Servicio de autenticación
export class AuthService {
    static async login(email: string, password: string) {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo: email, password }),
            });

            if (!response.ok) {
                const error = (await response.json().catch(() => null)) as {
                    message?: string;
                    error?: string;
                    statusCode?: number;
                } | null;

                const errorMessage = error?.message ?? "Credenciales inválidas o usuario no encontrado";
                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            console.error("Error al realizar la solicitud de login:", error);
            if (error instanceof Error) {
                throw new Error(error.message ?? "Error de red o del servidor");
            }
            throw new Error("Error desconocido");
        }
    }

    static async register(data: {
        identificacion: string;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;
        correo: string;
        password: string;
        telefono: string;
        direccion: string;
    }) {
        const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al registrar usuario");
        }
        return response.json();
    }

    static async getProfile(token: string) {
        const response = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener perfil");
        }
        return response.json();
    }
}

export default AuthService;
