import { EncrypterConfig } from "./infraestructure/crypto/config/EncrypterConfig";
import { CryptoEncrypter } from "./infraestructure/crypto/CryptoEncrypter";
import { EnvDatabaseConfig } from "./infraestructure/typeorm/config/EnvDatabase.config";
import { TypeORMDataSource } from "./infraestructure/typeorm/data-source";
import express from "express";
import { createTokenRouter } from "./presentation/routes";
import { TypeOrmTokenRepository } from "./infraestructure/typeorm/repositories/TypeOrmTokenRepository";
import { CreateTokenUseCase } from "./application/use-cases/create-token/CreateTokenUseCase";
import { TOTPGenerator } from "./infraestructure/otp/TOTPGenerator";

async function bootstrap() {
  const app = express();
  app.use(express.json());

  try {
    const DatabaseConfig = new EnvDatabaseConfig();
    const cryptoConfig = new EncrypterConfig();
    const encrypter = new CryptoEncrypter(cryptoConfig);
    const otpGenerator = new TOTPGenerator();

    TypeORMDataSource.configure(DatabaseConfig);
    await TypeORMDataSource.initialize();
    console.log("Database connected");

    const tokenRepo = new TypeOrmTokenRepository(encrypter);
    const createTokenUseCase = new CreateTokenUseCase(tokenRepo, otpGenerator);
    
    const tokenRouter = createTokenRouter(createTokenUseCase);
    app.use("/token", tokenRouter);

    app.listen(3000, () => console.log("Server running on port 3000"));

  } catch (error) {
    console.error("Bootstrap failed:", error);
    process.exit(1);
  }
}

bootstrap();