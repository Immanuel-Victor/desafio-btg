export class Helpers {
    static getCurrentUnixTime(): number {
        return Math.floor(Date.now() / 1000);
    }

    static getCounter(timeWindow = 30): number {
        return Math.floor(this.getCurrentUnixTime() / timeWindow);
    }

    static encodeCounter(counter: number): Buffer {
        const limitedBuffer = Buffer.alloc(8);
        limitedBuffer.writeBigInt64BE(BigInt(counter));
        return limitedBuffer;
    }
    
}