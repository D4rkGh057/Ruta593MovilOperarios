// Interfaces para autenticación
export interface LoginRequest {
    correo: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        correo: string;
        roles: string[];
    };
}

export interface RegisterRequest {
    identificacion: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    correo: string;
    password: string;
    telefono?: string;
    direccion?: string;
}

export interface RegisterResponse {
    message: string;
}

export interface ProfileResponse {
    id: number;
    identificacion: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    correo: string;
    telefono?: string;
    direccion?: string;
}
