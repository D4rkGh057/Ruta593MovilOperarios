// Servicio para frecuencias
import { API_ENDPOINTS } from "../../config/api";
import { Frecuencia } from "../domain/Frecuencia";

export class FrecuenciaService {
    async getByOrigen(origen: string): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_ORIGEN(origen));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por origen: ${response.status}`);
        }
        return response.json();
    }

    async getByDestino(destino: string): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_DESTINO(destino));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por destino: ${response.status}`);
        }
        return response.json();
    }

    async getAllFrecuencias(): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias: ${response.status}`);
        }
        return response.json();
    }

    async getFrecuenciaById(id: string): Promise<Frecuencia> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencia: ${response.status}`);
        }
        return response.json();
    }

    async createFrecuencia(frecuenciaData: Partial<Frecuencia>): Promise<Frecuencia> {
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

    async updateFrecuencia(id: string, frecuenciaData: Partial<Frecuencia>): Promise<Frecuencia> {
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

    async deleteFrecuencia(id: string): Promise<void> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar frecuencia: ${response.status}`);
        }
    }

    async getByProvincia(provincia: string): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_PROVINCIA(provincia));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por provincia: ${response.status}`);
        }
        return response.json();
    }

    async getFrecuenciasByConductor(conductorId: string): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_CONDUCTOR(conductorId));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por conductor: ${response.status}`);
        }
        return response.json();
    }

    async getByBus(busId: string): Promise<Frecuencia[]> {
        const response = await fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_BUS(busId));
        if (!response.ok) {
            throw new Error(`Error al obtener frecuencias por bus: ${response.status}`);
        }
        return response.json();
    }

    // Métodos estáticos para compatibilidad hacia atrás
    static async getByOrigen(origen: string): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getByOrigen(origen);
    }

    static async getByDestino(destino: string): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getByDestino(destino);
    }

    static async getAllFrecuencias(): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getAllFrecuencias();
    }

    static async getFrecuenciaById(id: string): Promise<Frecuencia> {
        const service = new FrecuenciaService();
        return service.getFrecuenciaById(id);
    }

    static async createFrecuencia(frecuenciaData: Partial<Frecuencia>): Promise<Frecuencia> {
        const service = new FrecuenciaService();
        return service.createFrecuencia(frecuenciaData);
    }

    static async updateFrecuencia(id: string, frecuenciaData: Partial<Frecuencia>): Promise<Frecuencia> {
        const service = new FrecuenciaService();
        return service.updateFrecuencia(id, frecuenciaData);
    }

    static async deleteFrecuencia(id: string): Promise<void> {
        const service = new FrecuenciaService();
        return service.deleteFrecuencia(id);
    }

    static async getByProvincia(provincia: string): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getByProvincia(provincia);
    }

    static async getByConductor(conductorId: string): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getFrecuenciasByConductor(conductorId);
    }

    static async getByBus(busId: string): Promise<Frecuencia[]> {
        const service = new FrecuenciaService();
        return service.getByBus(busId);
    }
}
