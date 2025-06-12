// Servicio para frecuencias
import { API_ENDPOINTS } from "../../config/api";

export class FrecuenciaService {
    static async getByOrigen(origen: string) {
        return fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_ORIGEN(origen)).then((res) => res.json());
    }
    static async getByDestino(destino: string) {
        return fetch(API_ENDPOINTS.FRECUENCIAS.GET_BY_DESTINO(destino)).then((res) => res.json());
    }
}
