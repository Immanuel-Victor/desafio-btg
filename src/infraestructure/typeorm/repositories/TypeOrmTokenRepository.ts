import { Repository } from "typeorm";
import { ITokenRepository } from "../../../application/interfaces/ITokenRepository";
import { Token } from "../../../domain/entities/Token";
import { TypeORMDataSource } from "../data-source";
import { IEncrypter } from "../../../application/interfaces/IEncrypter";

export class TypeOrmTokenRepository implements ITokenRepository {
    private repository: Repository<Token>
    constructor(private readonly encrypter: IEncrypter) {
        this.repository = TypeORMDataSource.getInstance().getRepository(Token)
    }

    async save(token: Token): Promise<string> {
        const encryptedSecret = await this.encrypter.encrypt(token.secret);
        const encryptedToken = new Token(
            encryptedSecret, 
            token.expirationTime
        )

        const savedToken = await this.repository.save(encryptedToken)
        return savedToken.id;
    }
}