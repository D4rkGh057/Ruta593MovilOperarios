export interface Bus {
    bus_id?: number;
    numero_bus: number;
    placa: string;
    chasis: string;
    carroceria: string;
    total_asientos_normales: number;
    total_asientos_vip: number;
    activo?: boolean;
    files?: Array<string | null>;
    fecha_creacion?: string;
    asientos?: Array<{
        asiento_id: number;
        tipo_asiento: string;
        numero_asiento: number;
        fecha_creacion: string;
    }>;
}
