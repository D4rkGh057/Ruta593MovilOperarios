export interface Ruta {
    ruta_id: number;
    frecuencia_id: number;
    parada_id: number;
    orden: number;
    distancia_parada: number;
    precio_parada: number;
    tiempo_parada: string;
    activo: boolean;
    fecha_creacion?: string;
    frecuencia?: any;
    parada?: any;
}
