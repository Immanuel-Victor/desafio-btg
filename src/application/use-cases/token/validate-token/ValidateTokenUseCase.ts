import { Token } from "../../../../domain/entities/Token";
import { IEncrypter } from "../../../interfaces/IEncrypter";
import { ITokenRepository } from "../../../interfaces/ITokenRepository";
import { IOTPGenerator } from "../../../interfaces/otp/IOTPGenerator";

interface IValidateTokenDto {
    id: string;
    otpString: string;
}

interface IValidateTokenResponse {
    message?: string;
    isValid: boolean
}

export class ValidateTokenUseCase {
    public constructor(
        private readonly _tokenRepository: ITokenRepository,
        private readonly _otpGenerator: IOTPGenerator,
        private readonly _encrypter: IEncrypter,
    ) {}

    public async execute(input: IValidateTokenDto): Promise<IValidateTokenResponse> {
        const { otpString, id } = input;

        const token = await this._tokenRepository.findById(id);

        if (!token) return { message: "token not found", isValid: false };

        if(token.isExpired()) return { message: "token expired", isValid: false }

        const decryptedSecret = await this._encrypter.decrypt(token.secret);
        const expectedOtp = this._otpGenerator.generate(decryptedSecret);
        const isValid = expectedOtp === otpString;
        return {
            isValid,
        }
    }
}