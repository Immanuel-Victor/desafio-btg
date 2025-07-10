import { TypeORMDataSource } from "./data-source";
import { EnvDatabaseConfig } from "./config/EnvDatabase.config";
import { DataSource } from "typeorm";

TypeORMDataSource.configure(new EnvDatabaseConfig());

export default new DataSource(TypeORMDataSource.getDataSourceOptions());