export interface Frecuencia {
    frecuencia_id?: number;
    nombre_frecuencia: string;
    bus_id: number;
    conductor_id: number;
    cooperativa_id?: number;
    hora_salida: string;
    hora_llegada: string;
    origen: string;
    destino: string;
    provincia: string;
    activo: boolean;
    total: number;
    nro_aprobacion: string;
    es_directo: boolean;
    fecha_creacion?: string;
    conductor?: any;
    bus?: any;
    rutas?: any[];
}
