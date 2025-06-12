import { API_ENDPOINTS } from "../../config/api";

export class BoletoService {
    static async getBoletoById(boletoId: number) {
        return fetch(`${API_ENDPOINTS.BOLETOS.GET_BY_ID(boletoId)}`)
    }

    static async getAllBoletos() {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_ALL);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener boletos");
        }
        return response.json();
    }

    static async getBoletosByUser(userId: string) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_USER(userId));
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener boletos del usuario");
        }
        return response.json();
    }
}