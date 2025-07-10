import { IEncrypterConfig } from "../../../application/interfaces/config/IEncrypterConfig";
import * as dotenv from 'dotenv'

export class EncrypterConfig implements IEncrypterConfig {
    constructor() {
        dotenv.config();
    }

    getSecret(): string {
        return process.env.SECRET;
    }
    
}