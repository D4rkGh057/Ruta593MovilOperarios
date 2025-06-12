import SessionStorage from "../../adapters/stores/SessionStorage";
import { User } from "../domain/User";

export interface LoginPort {
    login(email: string, password: string): Promise<{ user: User; token: string }>;
    register(email: string, password: string): Promise<{ user: User; token: string }>;
}

export class LoginUseCase {
    private readonly loginPort: LoginPort;

    constructor(loginPort: LoginPort) {
        this.loginPort = loginPort;
    }

    async execute(email: string, password: string): Promise<{ user: User; token: string }> {
        const result = await this.loginPort.login(email, password);
        await SessionStorage.saveSession(result.token);
        return result;
    }

    async executeRegister(email: string, password: string): Promise<{ user: User; token: string }> {
        const result = await this.loginPort.register(email, password);
        console.log("Token to be saved:", result.token);
        await SessionStorage.saveSession(result.token);
        return result;
    }
}
