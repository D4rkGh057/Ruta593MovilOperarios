// Servicio para cooperativas
import { API_ENDPOINTS } from "../../config/api";

export class CooperativaService {
    static async getAllCooperativas() {
        const response = await fetch(API_ENDPOINTS.COOPERATIVAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener cooperativas: ${response.status}`);
        }
        return response.json();
    }

    static async getCooperativaById(id: number) {
        const response = await fetch(API_ENDPOINTS.COOPERATIVAS.GET_BY_ID(id));
        if (!response.ok) {
            throw new Error(`Error al obtener cooperativa: ${response.status}`);
        }
        return response.json();
    }

    static async createCooperativa(formData: FormData) {
        const response = await fetch(API_ENDPOINTS.COOPERATIVAS.CREATE, {
            method: "POST",
            body: formData, // multipart/form-data para logo
        });
        if (!response.ok) {
            throw new Error(`Error al crear cooperativa: ${response.status}`);
        }
        return response.json();
    }

    static async updateCooperativa(id: number, formData: FormData) {
        const response = await fetch(API_ENDPOINTS.COOPERATIVAS.UPDATE(id), {
            method: "PATCH",
            body: formData, // multipart/form-data para logo
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar cooperativa: ${response.status}`);
        }
        return response.json();
    }

    static async deleteCooperativa(id: number) {
        const response = await fetch(API_ENDPOINTS.COOPERATIVAS.DELETE(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar cooperativa: ${response.status}`);
        }
        return response.json();
    }
}
