export interface Boleto {
    boleto_id?: number;
    total: number;
    cantidad_asientos: number;
    estado: string;
    url_imagen_qr: string;
    asientos: string; // Números de asientos separados por coma (ej: "15,16")
    fecha_emision?: string;
    reserva?: any;
    usuario?: any;
}
