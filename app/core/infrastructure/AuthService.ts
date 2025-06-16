import { API_ENDPOINTS } from "../../config/api";
import { User } from "../domain/User";

// Interfaces para las respuestas de la API
interface LoginResponse {
    token: string;
    user: {
        id: number;
        correo: string;
        roles: string[];
    };
}

interface RegisterResponse {
    message: string;
    token?: string;
    user?: User;
}

interface ProfileResponse {
    id?: number;              // A veces puede venir como 'id'
    usuario_id?: number;      // A veces puede venir como 'usuario_id'
    identificacion?: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    correo: string;
    telefono?: string;
    direccion?: string;
    rol?: string;             // El rol viene en el perfil según tu respuesta
}

// Servicio de autenticación
export class AuthService {
    static async login(email: string, password: string): Promise<LoginResponse> {
        try {
            console.log('Realizando login con:', { correo: email });
            console.log('Contraseña:', { password: password ? "********" : "No proporcionada" });
            
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

                const errorMessage =
                    error?.message ?? "Credenciales inválidas o usuario no encontrado";
                throw new Error(errorMessage);
            }

            const result = await response.json() as LoginResponse;
            console.log('Respuesta del login:', result);
            return result;
        } catch (error) {
            console.error("Error al realizar la solicitud de login:", error);
            if (error instanceof Error) {
                throw new Error(error.message ?? "Error de red o del servidor");
            }
            throw new Error("Error desconocido");
        }
    }    static async register(data: {
        identificacion: string;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;
        correo: string;
        password: string;
        telefono: string;
        direccion: string;
    }): Promise<RegisterResponse> {
        try {
            console.log('Realizando registro con:', data);
            
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
            
            const result = await response.json() as RegisterResponse;
            console.log('Respuesta del registro:', result);
            return result;
        } catch (error) {
            console.error("Error al realizar el registro:", error);
            if (error instanceof Error) {
                throw new Error(error.message ?? "Error de red o del servidor");
            }
            throw new Error("Error desconocido en el registro");
        }
    }    static async getProfile(token: string): Promise<ProfileResponse> {
        try {
            console.log('Obteniendo perfil del usuario con token:', token.substring(0, 20) + '...');
            
            const response = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                console.error('Error al obtener perfil:', error);
                throw new Error(error.message ?? "Error al obtener perfil");
            }
            
            const profile = await response.json() as ProfileResponse;
            console.log('Perfil obtenido:', profile);
            
            // Validar que tengamos los datos mínimos necesarios
            if (!profile.primer_nombre || !profile.primer_apellido || !profile.correo) {
                console.warn('⚠️ Perfil incompleto recibido:', profile);
            }
            
            return profile;
        } catch (error) {
            console.error("Error al obtener el perfil del usuario:", error);
            if (error instanceof Error) {
                throw new Error(error.message ?? "Error de red o del servidor");
            }
            throw new Error("Error desconocido al obtener perfil");
        }
    }
}

export default AuthService;
