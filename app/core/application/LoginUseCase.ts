import SessionStorage from "../../adapters/stores/SessionStorage";
import { User } from "../domain/User";

export interface LoginPort {
    login(email: string, password: string): Promise<{ user: User; token: string }>;
    register(data: {
        identificacion: string;
        primer_nombre: string;
        segundo_nombre: string;
        primer_apellido: string;
        segundo_apellido: string;
        correo: string;
        password: string;
        telefono: string;
        direccion: string;
    }): Promise<{ user: User; token: string }>;
}

export class LoginUseCase {
    private readonly loginPort: LoginPort;

    constructor(loginPort: LoginPort) {
        this.loginPort = loginPort;
    }    async execute(email: string, password: string): Promise<{ user: User; token: string }> {
        const result = await this.loginPort.login(email, password);
        await SessionStorage.saveSession(result.token, result.user);
        return result;
    }    async executeRegister(data: {
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
        const result = await this.loginPort.register(data);
        console.log("Token to be saved:", result.token);
        console.log("User data to be saved:", result.user);
        await SessionStorage.saveSession(result.token, result.user);
        return result;
    }
}
