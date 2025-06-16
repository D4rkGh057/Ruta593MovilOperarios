export interface Reserva {
    reserva_id: number;
    usuario_id: number;
    asiento_id: number;
    frecuencia_id: number;
    boleto_id: number;
    nombre_pasajero: string;
    metodo_pago: string;
    identificacion_pasajero: string;
    estado: string;
    fecha_viaje: string;
    hora_viaje: string;
    precio: number;
    destino_reserva: string;
    fecha_creacion?: string;
    usuario?: any;
    asiento?: any;
    frecuencia?: any;
    boleto?: any;
}
