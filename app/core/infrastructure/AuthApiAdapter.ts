import { LoginPort } from "../application/LoginUseCase";
import { User } from "../domain/User";
import { AuthService } from "./AuthService";

// Implementación de autenticación usando la API real
export class AuthApiAdapter implements LoginPort {    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        try {
            // Paso 1: Realizar login para obtener el token
            const loginResult = await AuthService.login(email, password);
            console.log('Login exitoso, obteniendo perfil completo...');
            
            // Paso 2: Usar el token para obtener el perfil completo del usuario
            const profileData = await AuthService.getProfile(loginResult.token);
              // Paso 3: Mapear los datos del perfil al formato User
            const user: User = {
                usuario_id: profileData.usuario_id || profileData.id, // Manejar ambos campos
                identificacion: profileData.identificacion || '',
                primer_nombre: profileData.primer_nombre,
                segundo_nombre: profileData.segundo_nombre || '',
                primer_apellido: profileData.primer_apellido,
                segundo_apellido: profileData.segundo_apellido || '',
                correo: profileData.correo,
                telefono: profileData.telefono || '',
                direccion: profileData.direccion || '',
                rol: profileData.rol || 'usuario_normal', // Usar el rol del perfil
                fecha_creacion: new Date().toISOString(), // No viene en el perfil
                activo: true // Asumir activo si está logueado
            };
            
            console.log('✅ Datos completos del usuario mapeados correctamente:', {
                id: user.usuario_id,
                nombre: user.primer_nombre,
                apellido: user.primer_apellido,
                correo: user.correo,
                telefono: user.telefono,
                direccion: user.direccion,
                rol: user.rol,
                identificacion: user.identificacion
            });
            
            return { user, token: loginResult.token };
            
        } catch (error) {
            console.error('Error en el proceso de login:', error);
            if (error instanceof TypeError && error.message.includes('roles')) {
                console.error('Error específico: Intentando acceder a roles que no existe');
                console.error('Datos del login:', arguments);
            }
            throw error;
        }
    }async register(data: {
        identificacion: string;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;
        correo: string;
        password: string;
        telefono: string;
        direccion: string;
    }): Promise<{ user: User; token: string }> {
        try {
            // Paso 1: Realizar registro
            const registerResult = await AuthService.register(data);
            console.log('Registro exitoso:', registerResult);
            
            // Paso 2: Si el registro devuelve un token, obtener el perfil
            if (registerResult.token) {
                console.log('Registro devolvió token, obteniendo perfil...');
                const profileData = await AuthService.getProfile(registerResult.token);
                
                const user: User = {
                    usuario_id: profileData.id,
                    identificacion: profileData.identificacion,
                    primer_nombre: profileData.primer_nombre,
                    segundo_nombre: profileData.segundo_nombre || '',
                    primer_apellido: profileData.primer_apellido,
                    segundo_apellido: profileData.segundo_apellido || '',
                    correo: profileData.correo,
                    telefono: profileData.telefono || '',
                    direccion: profileData.direccion || '',
                    rol: 'usuario_normal',
                    fecha_creacion: new Date().toISOString(),
                    activo: true
                };
                
                return { user, token: registerResult.token };
            }
            // Paso 3: Si no hay token en el registro, hacer login automático
            else {
                console.log('Registro sin token, realizando login automático...');
                return await this.login(data.correo, data.password);
            }
            
        } catch (error) {
            console.error('Error en el proceso de registro:', error);
            throw error;
        }
    }
}
