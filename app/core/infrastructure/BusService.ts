import { API_ENDPOINTS } from "../../config/api";

// Servicio para buses

export class BusService {
    static async getBusById(busId: number) {
        // return fetch(`${API_ENDPOINTS.BUSES.GET_BY_ID(busId)}`)
        throw new Error("No implementado");
    }

    static async getAllBuses() {
        const response = await fetch(API_ENDPOINTS.BUSES.GET_ALL);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener buses");
        }
        return response.json();
    }
}
