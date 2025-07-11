export class Token {
  private _id?: string;
  private _expirationTime: Date;

  constructor(
    private _secret: string,
    expirationTime:  Date,
  ) {
    this._expirationTime = expirationTime;
  }

  public static create(secret: string, tokenDuration: string) {
      return new Token(secret, this.calculateExpirationDate(tokenDuration))
  }

  public static fromExistingToken(secret: string, expirationDate: Date) {
    return new Token(secret, expirationDate);
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get secret(): string {
    return this._secret;
  }

  set secret(value: string | undefined) {
    this._secret = value;
  }

  get expirationTime(): string {
    return this._expirationTime.toISOString();
  }

  get expirationDate(): Date {
    return this._expirationTime;
  }

  public isExpired(): boolean {
    return new Date() > this._expirationTime;
  }

    static calculateExpirationDate(duration: string): Date {
    const match = duration.match(/^(\d+)([hdwy])$/i);
    if (!match) throw new Error("Invalid token duration format");

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    const ms = {
      h: 3600000,
      d: 86400000,
      w: 604800000,
      y: 31536000000
    }[unit];

    return new Date(Date.now() + value * ms);
  }

  setId(id: string) {
    this._id = id;
  }
}