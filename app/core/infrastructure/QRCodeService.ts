// Servicio para generar códigos QR

export interface QRCodeData {
    boletoId: string;
    reservaId: string;
    usuarioId: string;
    frecuenciaId: string;
    asientos: string;
    fechaViaje: string;
    horaViaje: string;
    precio: number;
    destino: string;
    transactionId?: string;
}

export class QRCodeService {
    /**
     * Genera los datos para el código QR
     */
    static generateQRData(data: QRCodeData): string {
        const qrData = {
            boleto: data.boletoId,
            reserva: data.reservaId,
            usuario: data.usuarioId,
            frecuencia: data.frecuenciaId,
            asientos: data.asientos,
            fecha: data.fechaViaje,
            hora: data.horaViaje,
            precio: data.precio,
            destino: data.destino,
            transaction: data.transactionId,
            generated: new Date().toISOString()
        };
        
        return JSON.stringify(qrData);
    }

    /**
     * Genera una URL base64 simulada para el QR
     * En un entorno real, aquí generarías la imagen QR y la subirías a un storage
     */
    static generateQRImageUrl(qrData: string): string {
        // En producción, aquí deberías:
        // 1. Generar la imagen QR usando la librería
        // 2. Subirla a tu storage (AWS S3, Firebase, etc.)
        // 3. Retornar la URL pública
        
        // Por ahora, generamos una URL simulada única
        const hash = btoa(qrData).slice(0, 10);
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&ecc=H&format=png&qzone=2&color=000000&bgcolor=ffffff&margin=10&qr=${hash}`;
    }

    /**
     * Valida los datos de un código QR
     */
    static validateQRData(qrString: string): QRCodeData | null {
        try {
            const data = JSON.parse(qrString);
            
            // Validar que tenga los campos requeridos
            if (!data.boleto || !data.reserva || !data.usuario || !data.asientos) {
                return null;
            }
            
            return {
                boletoId: data.boleto,
                reservaId: data.reserva,
                usuarioId: data.usuario,
                frecuenciaId: data.frecuencia,
                asientos: data.asientos,
                fechaViaje: data.fecha,
                horaViaje: data.hora,
                precio: data.precio,
                destino: data.destino,
                transactionId: data.transaction
            };
        } catch (error) {
            console.error('Error validando QR:', error);
            return null;
        }
    }

    /**
     * Formatea la información del boleto para mostrar
     */
    static formatBoletoInfo(data: QRCodeData): string {
        return `
BOLETO DE VIAJE - RUTA593
========================
Boleto: #${data.boletoId}
Reserva: #${data.reservaId}
Destino: ${data.destino}
Fecha: ${data.fechaViaje}
Hora: ${data.horaViaje}
Asientos: ${data.asientos}
Precio: $${data.precio}
${data.transactionId ? `TransID: ${data.transactionId}` : ''}
========================
        `.trim();
    }
}
