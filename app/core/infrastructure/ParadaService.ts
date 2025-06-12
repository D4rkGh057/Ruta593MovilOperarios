// Servicio para paradas
import { API_ENDPOINTS } from "../../config/api";

export class ParadaService {
    static async getAllParadas() {
        return fetch(API_ENDPOINTS.PARADAS.GET_ALL).then((res) => res.json());
    }
    static async getParadaByCiudad(ciudad: string) {
        return fetch(API_ENDPOINTS.PARADAS.GET_BY_CIUDAD(ciudad)).then((res) => res.json());
    }
}
