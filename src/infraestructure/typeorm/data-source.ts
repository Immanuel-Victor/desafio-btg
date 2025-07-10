import { DataSource, DataSourceOptions } from "typeorm";
import { IDatabaseConfig } from "../../application/interfaces/config/IDatabaseConfig";
import { TokenSchema } from "./schemas/Token.schema";

export class TypeORMDataSource {
    private static instance: DataSource;
    private static config: IDatabaseConfig;

    static configure(config: IDatabaseConfig): void {
        this.config = config;
    }

    static getDataSourceOptions() {
        if (!this.config) {
            throw new Error("DatabaseConfig must be configured first");
        }

        const options: DataSourceOptions = {
            type: "postgres",
            host: this.config.getDatabaseHost(),
            port: this.config.getDatabasePort(),
            username: this.config.getDatabaseUser(),
            password: this.config.getDatabasePassword(),
            database: this.config.getDatabaseName(),
            entities: [TokenSchema],
            migrations: ['src/infraestructure/typeorm/migrations/*.ts'],
            synchronize: false,
        }

        return options;
    }

    static getInstance(): DataSource {
        if (!this.instance) {
            const options = this.getDataSourceOptions();

            this.instance = new DataSource(options);
        }

        return this.instance;
    }

    static async initialize(): Promise<DataSource> {
        const dataSource = this.getInstance();

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        return dataSource;
    }
}