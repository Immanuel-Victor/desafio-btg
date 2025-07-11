import { EncrypterConfig } from "./infraestructure/crypto/config/EncrypterConfig";
import { CryptoEncrypter } from "./infraestructure/crypto/CryptoEncrypter";
import { EnvDatabaseConfig } from "./infraestructure/typeorm/config/EnvDatabase.config";
import { TypeORMDataSource } from "./infraestructure/typeorm/data-source";
import express from "express";
import { createTokenRouter, validateTokenRouter, getOtpRouter } from "./presentation/routes";
import { TypeOrmTokenRepository } from "./infraestructure/typeorm/repositories/TypeOrmTokenRepository";
import { CreateTokenUseCase } from "./application/use-cases/token/create-token/CreateTokenUseCase";
import { TOTPGenerator } from "./infraestructure/otp/TOTPGenerator";
import { ValidateTokenUseCase } from "./application/use-cases/token/validate-token/ValidateTokenUseCase";
import { GetOtpUseCase } from "./application/use-cases/token/get-otp/GetCurrentOtpUseCase";

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
    const validateTokenUseCase = new ValidateTokenUseCase(tokenRepo, otpGenerator, encrypter);
    const getOtpTokenUseCase = new GetOtpUseCase(tokenRepo, otpGenerator, encrypter);
    
    app.use("/api/token", createTokenRouter(createTokenUseCase));
    app.use("/api/token", validateTokenRouter(validateTokenUseCase))
    app.use("/api/token/otp", getOtpRouter(getOtpTokenUseCase))

    app.listen(3000, () => console.log("Server running on port 3000"));

  } catch (error) {
    console.error("Bootstrap failed:", error);
    process.exit(1);
  }
}

bootstrap();