// Servicio para paradas
import { API_ENDPOINTS } from "../../config/api";

export class ParadaService {
    static async getAllParadas() {
        const response = await fetch(API_ENDPOINTS.PARADAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener paradas: ${response.status}`);
        }
        return response.json();
    }

    static async getParadaByCiudad(ciudad: string) {
        const response = await fetch(API_ENDPOINTS.PARADAS.GET_BY_CIUDAD(ciudad));
        if (!response.ok) {
            throw new Error(`Error al obtener paradas por ciudad: ${response.status}`);
        }
        return response.json();
    }

    static async getParadaById(id: number) {
        const response = await fetch(API_ENDPOINTS.PARADAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener parada: ${response.status}`);
        }
        return response.json();
    }

    static async createParada(paradaData: any) {
        const response = await fetch(API_ENDPOINTS.PARADAS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paradaData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear parada: ${response.status}`);
        }
        return response.json();
    }

    static async updateParada(id: number, paradaData: any) {
        const response = await fetch(API_ENDPOINTS.PARADAS.UPDATE(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paradaData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar parada: ${response.status}`);
        }
        return response.json();
    }

    static async deleteParada(id: number) {
        const response = await fetch(API_ENDPOINTS.PARADAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar parada: ${response.status}`);
        }
        return response.json();
    }

    static async buscarParadas(ciudad: string) {
        const response = await fetch(API_ENDPOINTS.PARADAS.BUSCAR(ciudad));
        if (!response.ok) {
            throw new Error(`Error al buscar paradas: ${response.status}`);
        }
        return response.json();
    }
}
