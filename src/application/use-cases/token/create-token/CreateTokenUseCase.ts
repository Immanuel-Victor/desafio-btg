import { Token } from "../../../../domain/entities/Token";
import { ITokenRepository } from "../../../interfaces/ITokenRepository";
import { IOTPGenerator } from "../../../interfaces/otp/IOTPGenerator";

interface ICreateTokenDto {
    secret: string;
    tokenDuration: string;
}

interface ICreateTokenResponse {
    tokenId: string;
    otp: string;
}

export class CreateTokenUseCase {
    public constructor(
        private readonly _tokenRepository: ITokenRepository,
        private readonly _otpGenerator: IOTPGenerator,
    ) {}

    public async execute(input: ICreateTokenDto): Promise<ICreateTokenResponse> {
        const token = Token.create(input.secret, input.tokenDuration);
        console.log(token)

        const tokenId = await this._tokenRepository.save(token);
        const creationOtp = this._otpGenerator.generate(input.secret);

        return {
            tokenId: tokenId,
            otp: creationOtp,
        };
    }
}