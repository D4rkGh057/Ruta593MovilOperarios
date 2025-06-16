// Servicio para usuarios
import { API_ENDPOINTS } from "../../config/api";

export class UserService {
    static async getUserById(userId: string) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.GET_BY_ID(userId));
        if (!response.ok) {
            throw new Error(`Error al obtener usuario: ${response.status}`);
        }
        return response.json();
    }

    static async getAllUsers() {
        const response = await fetch(API_ENDPOINTS.USUARIOS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.status}`);
        }
        return response.json();
    }

    static async createUser(userData: any) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear usuario: ${response.status}`);
        }
        return response.json();
    }

    static async updateUser(userId: string, userData: any) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.UPDATE(userId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar usuario: ${response.status}`);
        }
        return response.json();
    }

    static async deleteUser(userId: string) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.DELETE(userId), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar usuario: ${response.status}`);
        }
        return response.json();
    }

    static async searchUserByName(name: string) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.SEARCH_BY_NAME(name));
        if (!response.ok) {
            throw new Error(`Error al buscar usuario: ${response.status}`);
        }
        return response.json();
    }

    static async getUserByCedula(cedula: string) {
        const response = await fetch(API_ENDPOINTS.USUARIOS.GET_BY_CEDULA(cedula));
        if (!response.ok) {
            throw new Error(`Error al obtener usuario por cédula: ${response.status}`);
        }
        return response.json();
    }
}
