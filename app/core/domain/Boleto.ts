export interface Boleto {
    boleto_id: number;
    total: number;
    cantidad_asientos: number;
    estado: string;
    url_imagen_qr: string;
    asientos: Array<{
        asiento_id: number;
        tipo_asiento: string;
        numero_asiento: number;
    }>;
    fecha_emision: string;
}
