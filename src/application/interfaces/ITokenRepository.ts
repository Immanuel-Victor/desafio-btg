import { Token } from "../../domain/entities/Token";

export interface ITokenRepository {
    save(token: Token): Promise<string>;
    findById(id: string): Promise<Token>;
}