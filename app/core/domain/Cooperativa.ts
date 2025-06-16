export interface Cooperativa {
    cooperativa_id: number;
    nombre: string;
    telefono: string;
    correo: string;
    logo: string;
    ruc: string;
    direccion: string;
    fecha_creacion?: string;
    activo?: boolean;
}
