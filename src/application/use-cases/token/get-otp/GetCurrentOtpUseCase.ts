import { IEncrypter } from "../../../interfaces/IEncrypter";
import { ITokenRepository } from "../../../interfaces/ITokenRepository";
import { IOTPGenerator } from "../../../interfaces/otp/IOTPGenerator";

export interface GetOtpDto {
    id: string
}

export interface GetOtpReturn {
    otp: string;
    expiresIn: number;
}

export class GetOtpUseCase {
    constructor(
        private readonly _repository: ITokenRepository,
        private readonly _otpGenerator: IOTPGenerator,
        private readonly _encrypter: IEncrypter,
    ) {

    }
    public async execute(otpDto: GetOtpDto): Promise<GetOtpReturn> {
        const token = await this._repository.findById(otpDto.id);
        if (!token) throw new Error("Token not found");

        const secret = await this._encrypter.decrypt(token.secret);
        const otp = this._otpGenerator.generate(secret);

        const expiresIn = 30 - (Math.floor(Date.now() / 1000) % 30);

        return { otp, expiresIn };
    }
}