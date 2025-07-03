// Configuración base de la API
export const IP = "192.168.1.13";
export const API_BASE_URL = `http://${IP}:3000/api`;

// Endpoints de la API
export const API_ENDPOINTS = {
    // Paradas
    PARADAS: {
        GET_ALL: `${API_BASE_URL}/paradas`,
        GET_BY_CIUDAD: (ciudad: string) => `${API_BASE_URL}/paradas/ciudad/${ciudad}`,
        BUSCAR: (ciudad: string) => `${API_BASE_URL}/paradas/buscar/${ciudad}`,
    },
    // Frecuencias
    FRECUENCIAS: {
        GET_ALL: `${API_BASE_URL}/frecuencias`,
        GET_BY_ORIGEN: (origen: string) => `${API_BASE_URL}/frecuencias/origen/${origen}`,
        GET_BY_DESTINO: (destino: string) => `${API_BASE_URL}/frecuencias/destino/${destino}`,
        GET_BY_CONDUCTOR: (conductorId: string) => `${API_BASE_URL}/frecuencias/conductor/${conductorId}`,
        GET_BY_BUS: (busId: string) => `${API_BASE_URL}/frecuencias/bus/${busId}`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/frecuencias/${id}`,
        GET_BY_PROVINCIA: (provincia: string) => `${API_BASE_URL}/frecuencias/provincia/${provincia}`,
        CREATE: `${API_BASE_URL}/frecuencias`,
        UPDATE: (id: string) => `${API_BASE_URL}/frecuencias/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/frecuencias/${id}`,
    },
    // Reservas
    RESERVAS: {
        GET_BY_USER: (userId: string) => `${API_BASE_URL}/reserva/usuario/${userId}`,
    },
    // Boletos
    BOLETOS: {
        GET_ALL: `${API_BASE_URL}/boletos`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/boletos/${id}`,
        GET_BY_USER: (userId: string) => `${API_BASE_URL}/boletos/usuario/${userId}`,
        GET_BY_FRECUENCIA: (frecuenciaId: string) => `${API_BASE_URL}/boletos/frecuencia/${frecuenciaId}`,
        GET_BY_RESERVA: (reservaId: string) => `${API_BASE_URL}/boletos/reserva/${reservaId}`,
        CREATE: `${API_BASE_URL}/boletos`,
        UPDATE: (id: string) => `${API_BASE_URL}/boletos/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/boletos/${id}`,
        VALIDATE: (boletoId: string) => `${API_BASE_URL}/boletos/${boletoId}/validate`,
    },
    // Cooperativas
    COOPERATIVAS: {
        GET_ALL: `${API_BASE_URL}/cooperativa`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/cooperativa/${id}`,
    },
    // Buses
    BUSES: {
        CREATE: `${API_BASE_URL}/buses`,
        GET_ALL: `${API_BASE_URL}/buses`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/buses/${id}`,
        UPDATE: (id: string) => `${API_BASE_URL}/buses/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/buses/${id}`,
    },
    // Usuarios
    USUARIOS: {
        CREATE: `${API_BASE_URL}/user`,
        GET_ALL: `${API_BASE_URL}/user`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/user/${id}`,
        UPDATE: (id: string) => `${API_BASE_URL}/user/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/user/${id}`,
    },
    // Autenticación
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        PROFILE: `${API_BASE_URL}/auth/profile`,
    },
};

export default API_ENDPOINTS;
