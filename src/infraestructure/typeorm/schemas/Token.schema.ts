import { EntitySchema } from "typeorm";
import { Token } from "../../../domain/entities/Token";

export const TokenSchema = new EntitySchema<Token>({
    name: "Token",
    tableName: 'tokens',
    target: Token,
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: true,
        },
        secret: {
            type: "varchar",
            name: "secret"
        },
        expirationTime: {
            type: "varchar",
            name: "expiration_time"
        }
    }
})