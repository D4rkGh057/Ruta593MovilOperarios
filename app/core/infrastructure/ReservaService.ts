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

    static async getReservaById(id: number) {
        const response = await fetch(API_ENDPOINTS.RESERVAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener reserva: ${response.status}`);
        }
        return response.json();
    }

    static async createReserva(reservaData: any) {
        const response = await fetch(API_ENDPOINTS.RESERVAS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear reserva: ${response.status}`);
        }
        return response.json();
    }

    static async updateReserva(id: number, reservaData: any) {
        const response = await fetch(API_ENDPOINTS.RESERVAS.UPDATE(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar reserva: ${response.status}`);
        }
        return response.json();
    }

    static async deleteReserva(id: number) {
        const response = await fetch(API_ENDPOINTS.RESERVAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar reserva: ${response.status}`);
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
