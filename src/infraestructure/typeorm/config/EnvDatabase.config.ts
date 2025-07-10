import { AppConfig, IDatabaseConfig } from "../../../application/interfaces/config/IDatabaseConfig";
import * as dotenv from 'dotenv'

export class EnvDatabaseConfig implements IDatabaseConfig {
    constructor() {
        dotenv.config();
    }
    
    getDatabaseUser(): string {
        return process.env.DB_USER || "test";
    }
    getDatabasePassword(): string {
        return process.env.DB_PASS || "test";
    }
    getDatabaseName(): string {
        return process.env.DB_NAME || "test";
    }

    getDatabaseHost(): string {
        return process.env.DB_HOST || "localhost";
    };

    getDatabasePort(): number {
        return parseInt(process.env.DB_HOST) || 5432;
    };
}