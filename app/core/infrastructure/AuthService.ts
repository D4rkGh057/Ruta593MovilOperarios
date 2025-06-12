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
                const error = await response.json().catch(() => ({}));
                console.error("Error en la respuesta de la API:", error);
                throw new Error(error.message ?? `Error al iniciar sesión: ${response.status} ${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            console.error("Error al realizar la solicitud de login:", error);
            throw new Error("Error de red o del servidor al intentar iniciar sesión");
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
