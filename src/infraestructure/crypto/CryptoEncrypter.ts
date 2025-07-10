import { IEncrypterConfig } from "../../application/interfaces/config/IEncrypterConfig";
import { IEncrypter } from "../../application/interfaces/IEncrypter";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";


export class CryptoEncrypter implements IEncrypter {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key: Buffer;
    private readonly ivLength = 16;

    constructor(private readonly config: IEncrypterConfig) {
        const secretKey = this.config.getSecret();
        this.key = createHash('sha256').update(secretKey).digest();
    }

  async encrypt(value: string): Promise<string> {
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    let encryptedValue = cipher.update(value, 'utf8', 'base64');
    
    encryptedValue += cipher.final('base64');
    
    const ivBase64 = iv.toString('base64');
    
    return `${ivBase64}:${encryptedValue}`;
  }

  async decrypt(value: string): Promise<string> {
    const [ivBase64, encryptedData] = value.split(':');

    const iv = Buffer.from(ivBase64, 'base64');
    
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

}