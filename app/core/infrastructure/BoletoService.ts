import { API_ENDPOINTS } from "../../config/api";

export class BoletoService {
    static async getBoletoById(boletoId: number) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_ID(boletoId));
        if (!response.ok) {
            throw new Error(`Error al obtener boleto: ${response.status}`);
        }
        return response.json();
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

    static async createBoleto(boletoData: any) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boletoData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear boleto: ${response.status}`);
        }
        return response.json();
    }

    static async updateBoleto(boletoId: number, boletoData: any) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.UPDATE(boletoId), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boletoData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar boleto: ${response.status}`);
        }
        return response.json();
    }

    static async deleteBoleto(boletoId: number) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.DELETE(boletoId), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar boleto: ${response.status}`);
        }
        return response.json();
    }

    static async getBoletosByReserva(reservaId: number) {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_RESERVA(reservaId));
        if (!response.ok) {
            throw new Error(`Error al obtener boletos por reserva: ${response.status}`);
        }
        return response.json();
    }
}
