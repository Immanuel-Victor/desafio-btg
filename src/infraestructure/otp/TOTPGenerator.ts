import { createHmac } from "crypto";
import { IOTPGenerator } from "../../application/interfaces/otp/IOTPGenerator";
import { Helpers } from "./helpers";

export class TOTPGenerator implements IOTPGenerator {
    generate(secret: string): string {
        const counter = Helpers.getCounter();
        const counterBuffer = Helpers.encodeCounter(counter);
        const hmac = createHmac('sha256', secret).update(counterBuffer).digest();

        const offset = hmac[hmac.length - 1] & 0x0f;

        const binaryCode =
            ((hmac[offset] & 0x7f) << 24) |
            ((hmac[offset + 1] & 0xff) << 16) |
            ((hmac[offset + 2] & 0xff) << 8) |
            (hmac[offset + 3] & 0xff);

        const otp = binaryCode % 1_000_000;
        return otp.toString().padStart(6, '0');
    }
}

