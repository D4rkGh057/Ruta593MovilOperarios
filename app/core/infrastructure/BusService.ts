import { API_ENDPOINTS } from "../../config/api";

// Servicio para buses

export class BusService {
    static async getBusById(busId: number) {
        const response = await fetch(API_ENDPOINTS.BUSES.GET_BY_ID(busId));
        if (!response.ok) {
            throw new Error(`Error al obtener bus: ${response.status}`);
        }
        return response.json();
    }

    static async getAllBuses() {
        const response = await fetch(API_ENDPOINTS.BUSES.GET_ALL);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener buses");
        }
        return response.json();
    }

    static async createBus(formData: FormData) {
        const response = await fetch(API_ENDPOINTS.BUSES.CREATE, {
            method: "POST",
            body: formData, // multipart/form-data para imágenes
        });
        if (!response.ok) {
            throw new Error(`Error al crear bus: ${response.status}`);
        }
        return response.json();
    }

    static async updateBus(busId: number, busData: any) {
        const response = await fetch(API_ENDPOINTS.BUSES.UPDATE(busId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(busData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar bus: ${response.status}`);
        }
        return response.json();
    }

    static async deleteBus(busId: number) {
        const response = await fetch(API_ENDPOINTS.BUSES.DELETE(busId), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar bus: ${response.status}`);
        }
        return response.json();
    }

    static async searchBusByPlaca(placa: string) {
        const response = await fetch(API_ENDPOINTS.BUSES.SEARCH_BY_PLACA(placa));
        if (!response.ok) {
            throw new Error(`Error al buscar bus por placa: ${response.status}`);
        }
        return response.json();
    }
}
