// Servicio para manejar el flujo completo de reserva y pago
import { Boleto } from '../domain/Boleto';
import { Reserva } from '../domain/Reserva';
import { BoletoService } from './BoletoService';
import { ComprobantePagoService } from './ComprobantePagoService';
import { PayPalService } from './PayPalService';
import { QRCodeData, QRCodeService } from './QRCodeService';
import { ReservaService } from './ReservaService';

export interface ReservaPaymentData {
    usuarioId: number;
    frecuenciaId: number;
    asientos: number[];
    fechaViaje: string;
    horaViaje: string;
    precio: number;
    destino: string;
    nombrePasajero: string;
    identificacionPasajero: string;
}

export interface PaymentResult {
    success: boolean;
    reservaId?: number;
    boletoId?: number;
    transactionId?: string;
    qrUrl?: string;
    error?: string;
}

export class ReservaPaymentService {
    /**
     * Inicia el proceso de pago con PayPal
     */
    static async initiatePayPalPayment(reservaData: ReservaPaymentData): Promise<string> {
        try {
            const totalAmount = reservaData.precio * reservaData.asientos.length;
            const description = `Ruta593 - ${reservaData.destino} - ${reservaData.asientos.length} asiento(s)`;
            
            const paymentUrl = await PayPalService.createOrder({
                amount: totalAmount,
                currency: 'USD',
                description: description,
                return_url: `ruta593movil://payment/success`,
                cancel_url: `ruta593movil://payment/cancel`
            });

            // Guardar datos temporalmente para usar después del pago
            await this.storeTemporaryReservationData(reservaData);
            
            return paymentUrl;
        } catch (error) {
            console.error('Error iniciando pago PayPal:', error);
            throw new Error('No se pudo iniciar el pago con PayPal');
        }
    }

    /**
     * Procesa el pago aprobado y completa la reserva
     */
    static async processApprovedPayment(
        paymentId: string, 
        payerId: string, 
        reservaData: ReservaPaymentData
    ): Promise<PaymentResult> {
        try {
            // 1. Capturar el pago en PayPal
            console.log('Capturando pago PayPal...');
            const captureResult = await PayPalService.captureOrder(paymentId);
            
            if (!PayPalService.validatePaymentStatus(captureResult)) {
                throw new Error('El pago no fue completado exitosamente');
            }

            const paymentInfo = PayPalService.extractPaymentInfo(captureResult);
            console.log('Pago capturado exitosamente:', paymentInfo);

            // 2. Crear el boleto
            console.log('Creando boleto...');
            const boletoData: Partial<Boleto> = {
                total: paymentInfo.amount,
                cantidad_asientos: reservaData.asientos.length,
                estado: 'activo',
                url_imagen_qr: '', // Se actualizará después
                asientos: reservaData.asientos.join(',')
            };

            const boleto = await BoletoService.createBoleto(boletoData);
            console.log('Boleto creado:', boleto);

            // 3. Crear las reservas (una por cada asiento)
            console.log('Creando reservas...');
            const reservas = [];
            
            for (const asiento of reservaData.asientos) {                const reservaDataItem: Partial<Reserva> = {
                    usuario_id: reservaData.usuarioId,
                    asiento_id: asiento, // Usando el número de asiento como ID
                    frecuencia_id: reservaData.frecuenciaId,
                    boleto_id: boleto.boleto_id,
                    nombre_pasajero: reservaData.nombrePasajero,
                    metodo_pago: 'paypal',
                    identificacion_pasajero: reservaData.identificacionPasajero,
                    estado: 'confirmada',
                    fecha_viaje: reservaData.fechaViaje,
                    hora_viaje: reservaData.horaViaje,
                    precio: reservaData.precio,
                    destino_reserva: reservaData.destino
                };

                const reserva = await ReservaService.createReserva(reservaDataItem);
                reservas.push(reserva);
                console.log(`Reserva creada para asiento ${asiento}:`, reserva);
            }

            // 4. Generar código QR
            console.log('Generando código QR...');
            const qrData: QRCodeData = {
                boletoId: boleto.boleto_id.toString(),
                reservaId: reservas[0].reserva_id.toString(),
                usuarioId: reservaData.usuarioId.toString(),
                frecuenciaId: reservaData.frecuenciaId.toString(),
                asientos: reservaData.asientos.join(','),
                fechaViaje: reservaData.fechaViaje,
                horaViaje: reservaData.horaViaje,
                precio: paymentInfo.amount,
                destino: reservaData.destino,
                transactionId: paymentInfo.transactionId
            };

            const qrDataString = QRCodeService.generateQRData(qrData);
            const qrImageUrl = QRCodeService.generateQRImageUrl(qrDataString);

            // 5. Actualizar el boleto con la URL del QR
            console.log('Actualizando boleto con QR...');
            await BoletoService.updateBoleto(boleto.boleto_id, {
                url_imagen_qr: qrImageUrl
            });            // 6. Crear comprobante de pago (simulando el recibo de PayPal)
            console.log('Creando comprobante de pago...');
            
            // Crear un FormData para el comprobante
            const comprobanteData = new FormData();
            comprobanteData.append('boleto_id', boleto.boleto_id.toString());
            comprobanteData.append('usuario_id', reservaData.usuarioId.toString());
            comprobanteData.append('estado', 'aprobado');
            comprobanteData.append('comentarios', 
                `Pago procesado vía PayPal. TransID: ${paymentInfo.transactionId}. Email: ${paymentInfo.payerEmail || 'N/A'}`
            );
            
            // Para el comprobante, usamos una URL que simula el recibo de PayPal
            // En producción, aquí se debería generar y subir un PDF del recibo
            const paypalReceiptUrl = `https://www.paypal.com/activity/payment/${paymentInfo.transactionId}`;
            comprobanteData.append('url_comprobante', paypalReceiptUrl);

            try {
                await ComprobantePagoService.createComprobante(comprobanteData);
                console.log('Comprobante de pago creado exitosamente');
            } catch (comprobanteError) {
                console.warn('Error creando comprobante, pero continuando:', comprobanteError);
                // No fallar todo el proceso si el comprobante falla
            }

            console.log('Proceso de reserva completado exitosamente');

            return {
                success: true,
                reservaId: reservas[0].reserva_id,
                boletoId: boleto.boleto_id,
                transactionId: paymentInfo.transactionId,
                qrUrl: qrImageUrl
            };        } catch (error) {
            console.error('Error procesando pago aprobado:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido procesando el pago'
            };
        }
    }

    /**
     * Guarda temporalmente los datos de la reserva
     */
    private static async storeTemporaryReservationData(reservaData: ReservaPaymentData): Promise<void> {
        try {
            // En un entorno real, estos datos se guardarían en un cache o base de datos temporal
            // Por ahora los guardamos en AsyncStorage
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            const tempData = {
                ...reservaData,
                timestamp: Date.now()
            };
            await AsyncStorage.setItem('temp_reservation', JSON.stringify(tempData));
        } catch (error) {
            console.warn('No se pudieron guardar los datos temporales:', error);
        }
    }

    /**
     * Recupera los datos temporales de la reserva
     */
    static async getTemporaryReservationData(): Promise<ReservaPaymentData | null> {
        try {
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            const tempDataString = await AsyncStorage.getItem('temp_reservation');
            
            if (!tempDataString) {
                return null;
            }

            const tempData = JSON.parse(tempDataString);
            
            // Verificar que los datos no sean muy antiguos (1 hora máximo)
            if (Date.now() - tempData.timestamp > 3600000) {
                await AsyncStorage.removeItem('temp_reservation');
                return null;
            }

            return tempData;
        } catch (error) {
            console.warn('Error recuperando datos temporales:', error);
            return null;
        }
    }

    /**
     * Limpia los datos temporales
     */
    static async clearTemporaryReservationData(): Promise<void> {
        try {
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            await AsyncStorage.removeItem('temp_reservation');
        } catch (error) {
            console.warn('Error limpiando datos temporales:', error);
        }
    }

    /**
     * Cancela una reserva y reintenta el reembolso si es posible
     */
    static async cancelReservation(reservaId: number): Promise<boolean> {
        try {
            // Actualizar estado de la reserva
            await ReservaService.updateReserva(reservaId, { estado: 'cancelada' });
            
            // En un entorno real, aquí se procesaría el reembolso
            console.log(`Reserva ${reservaId} cancelada`);
            
            return true;
        } catch (error) {
            console.error('Error cancelando reserva:', error);
            return false;
        }
    }
}
