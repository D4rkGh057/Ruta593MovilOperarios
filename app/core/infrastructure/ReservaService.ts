// Servicio para reservas
import { API_ENDPOINTS } from "../../config/api";

export class ReservaService {
    static async getAllReservas() {
        const response = await fetch(API_ENDPOINTS.RESERVAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener reservas: ${response.status}`);
        }
        return response.json();
    }

    static async getReservasByUser(userId: string) {
        const response = await fetch(API_ENDPOINTS.RESERVAS.GET_BY_USER(userId));
        if (!response.ok) {
            throw new Error(`Error al obtener reservas del usuario: ${response.status}`);
        }
        return response.json();
    }
}
