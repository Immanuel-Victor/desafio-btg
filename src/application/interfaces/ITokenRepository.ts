import { Token } from "../../domain/entities/Token";

export interface ITokenRepository {
    save(token: Token): Promise<string>
}