export interface IOTPGenerator {
    generate(secret: string): string;
}