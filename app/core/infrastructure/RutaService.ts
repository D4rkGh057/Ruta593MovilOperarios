// Servicio para rutas
import { API_ENDPOINTS } from "../../config/api";

export class RutaService {
    static async getAllRutas() {
        const response = await fetch(API_ENDPOINTS.RUTAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener rutas: ${response.status}`);
        }
        return response.json();
    }

    static async getRutaById(id: number) {
        const response = await fetch(API_ENDPOINTS.RUTAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener ruta: ${response.status}`);
        }
        return response.json();
    }

    static async createRuta(rutaData: any) {
        const response = await fetch(API_ENDPOINTS.RUTAS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rutaData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear ruta: ${response.status}`);
        }
        return response.json();
    }

    static async updateRuta(id: number, rutaData: any) {
        const response = await fetch(API_ENDPOINTS.RUTAS.UPDATE(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rutaData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar ruta: ${response.status}`);
        }
        return response.json();
    }

    static async deleteRuta(id: number) {
        const response = await fetch(API_ENDPOINTS.RUTAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar ruta: ${response.status}`);
        }
        return response.json();
    }

    static async getRutasByFrecuencia(frecuenciaId: number) {
        const response = await fetch(API_ENDPOINTS.RUTAS.GET_BY_FRECUENCIA(frecuenciaId));
        if (!response.ok) {
            throw new Error(`Error al obtener rutas por frecuencia: ${response.status}`);
        }
        return response.json();
    }

    static async getRutasByParada(paradaId: number) {
        const response = await fetch(API_ENDPOINTS.RUTAS.GET_BY_PARADA(paradaId));
        if (!response.ok) {
            throw new Error(`Error al obtener rutas por parada: ${response.status}`);
        }
        return response.json();
    }
}
