export interface Factura {
    factura_id: number;
    numeroFactura: string;
    fechaEmision: string;
    subtotal: number;
    iva: number;
    total: number;
    pdfUrl: string;
    reservaId: number;
    usuarioId: number;
    cooperativaId: number;
    boleto_id: number;
    reserva?: any;
    usuario?: any;
    cooperativa?: any;
    boleto?: any;
}
