// Servicio para comprobantes de pago
import { API_ENDPOINTS } from "../../config/api";

export class ComprobantePagoService {
    static async getAllComprobantes() {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener comprobantes: ${response.status}`);
        }
        return response.json();
    }

    static async getComprobanteById(id: number) {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener comprobante: ${response.status}`);
        }
        return response.json();
    }

    static async createComprobante(formData: FormData) {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.CREATE, {
            method: "POST",
            body: formData, // multipart/form-data para imagen
        });
        if (!response.ok) {
            throw new Error(`Error al crear comprobante: ${response.status}`);
        }
        return response.json();
    }

    static async updateComprobante(id: number, comprobanteData: any) {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.UPDATE(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comprobanteData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar comprobante: ${response.status}`);
        }
        return response.json();
    }

    static async deleteComprobante(id: number) {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar comprobante: ${response.status}`);
        }
        return response.json();
    }

    static async getComprobantesByUser(userId: number) {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.GET_BY_USER(userId));
        if (!response.ok) {
            throw new Error(`Error al obtener comprobantes del usuario: ${response.status}`);
        }
        return response.json();
    }

    static async getTotalComprobantes() {
        const response = await fetch(API_ENDPOINTS.COMPROBANTES_PAGO.GET_TOTAL);
        if (!response.ok) {
            throw new Error(`Error al obtener total de comprobantes: ${response.status}`);
        }
        return response.json();
    }
}
