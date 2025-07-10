export interface AppConfig {}

export interface IDatabaseConfig {
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getDatabasePort(): number;
    getDatabaseHost(): string;
}