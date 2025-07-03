import { API_ENDPOINTS } from "../../config/api";
import { Boleto } from "../domain/Boleto";

export class BoletoService {
    async getBoletoById(boletoId: string): Promise<Boleto> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_ID(boletoId));
        if (!response.ok) {
            throw new Error(`Error al obtener boleto: ${response.status}`);
        }
        return response.json();
    }

    async getAllBoletos(): Promise<Boleto[]> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_ALL);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener boletos");
        }
        return response.json();
    }

    async getBoletosByUser(userId: string): Promise<Boleto[]> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_USER(userId));
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener boletos del usuario");
        }
        return response.json();
    }

    async getBoletosByFrecuencia(frecuenciaId: string): Promise<Boleto[]> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_FRECUENCIA(frecuenciaId));
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al obtener boletos por frecuencia");
        }
        return response.json();
    }

    async validateBoleto(boletoId: string): Promise<Boleto> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.VALIDATE(boletoId), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message ?? "Error al validar boleto");
        }
        return response.json();
    }

    async createBoleto(boletoData: Partial<Boleto>): Promise<Boleto> {
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

    async updateBoleto(boletoId: string, boletoData: Partial<Boleto>): Promise<Boleto> {
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

    async deleteBoleto(boletoId: string): Promise<void> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.DELETE(boletoId), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar boleto: ${response.status}`);
        }
    }

    async getBoletosByReserva(reservaId: string): Promise<Boleto[]> {
        const response = await fetch(API_ENDPOINTS.BOLETOS.GET_BY_RESERVA(reservaId));
        if (!response.ok) {
            throw new Error(`Error al obtener boletos por reserva: ${response.status}`);
        }
        return response.json();
    }

    // Métodos estáticos para compatibilidad hacia atrás
    static async getBoletoById(boletoId: string): Promise<Boleto> {
        const service = new BoletoService();
        return service.getBoletoById(boletoId);
    }

    static async getAllBoletos(): Promise<Boleto[]> {
        const service = new BoletoService();
        return service.getAllBoletos();
    }

    static async getBoletosByUser(userId: string): Promise<Boleto[]> {
        const service = new BoletoService();
        return service.getBoletosByUser(userId);
    }

    static async createBoleto(boletoData: Partial<Boleto>): Promise<Boleto> {
        const service = new BoletoService();
        return service.createBoleto(boletoData);
    }

    static async updateBoleto(boletoId: string, boletoData: Partial<Boleto>): Promise<Boleto> {
        const service = new BoletoService();
        return service.updateBoleto(boletoId, boletoData);
    }

    static async deleteBoleto(boletoId: string): Promise<void> {
        const service = new BoletoService();
        return service.deleteBoleto(boletoId);
    }

    static async getBoletosByReserva(reservaId: string): Promise<Boleto[]> {
        const service = new BoletoService();
        return service.getBoletosByReserva(reservaId);
    }
}
