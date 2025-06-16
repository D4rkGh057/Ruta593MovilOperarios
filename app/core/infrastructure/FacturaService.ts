// Servicio para facturas
import { API_ENDPOINTS } from "../../config/api";

export class FacturaService {
    static async getAllFacturas() {
        const response = await fetch(API_ENDPOINTS.FACTURAS.GET_ALL);
        if (!response.ok) {
            throw new Error(`Error al obtener facturas: ${response.status}`);
        }
        return response.json();
    }

    static async getFacturasByUser(userId: number) {
        const response = await fetch(API_ENDPOINTS.FACTURAS.GET_BY_USER(userId));
        if (!response.ok) {
            throw new Error(`Error al obtener facturas del usuario: ${response.status}`);
        }
        return response.json();
    }
}
