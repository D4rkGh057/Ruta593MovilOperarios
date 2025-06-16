export interface ComprobantePago {
    comprobante_id: number;
    boleto_id: number;
    usuario_id: number;
    url_comprobante: string;
    estado: string;
    comentarios?: string;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    boleto?: any;
    usuario?: any;
}
