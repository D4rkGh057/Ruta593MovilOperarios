// Servicio para frecuencias
import { API_ENDPOINTS } from "../../config/api";

export class FrecuenciaService {
    static async getByOrigen(origen: string) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_ORIGEN(origen));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por origen: ${response.status}`);
        }
        return response.json();
    }

    static async getByDestino(destino: string) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_DESTINO(destino));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por destino: ${response.status}`);
        }
        return response.json();
    }

    static async getAllFrecuencias() {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias: ${response.status}`);
        }
        return response.json();
    }

    static async getFrecuenciaById(id: number) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencia: ${response.status}`);
        }
        return response.json();
    }

    static async createFrecuencia(frecuenciaData: any) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(frecuenciaData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear frecuencia: ${response.status}`);
        }
        return response.json();
    }

    static async updateFrecuencia(id: number, frecuenciaData: any) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.UPDATE(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(frecuenciaData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar frecuencia: ${response.status}`);
        }
        return response.json();
    }

    static async deleteFrecuencia(id: string) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar frecuencia: ${response.status}`);
        }
        return response.json();
    }

    static async getByProvincia(provincia: string) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_PROVINCIA(provincia));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por provincia: ${response.status}`);
        }
        return response.json();
    }

    static async getByConductor(conductorId: number) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_CONDUCTOR(conductorId));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por conductor: ${response.status}`);
        }
        return response.json();
    }

    static async getByBus(busId: number) {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_BUS(busId));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por bus: ${response.status}`);
        }
        return response.json();
    }
}
