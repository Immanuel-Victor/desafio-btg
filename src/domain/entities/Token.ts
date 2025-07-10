export class Token {
  private _id?: string;

  constructor(
    private _secret: string,
    private _expirationTime: string
  ) {}

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get secret(): string {
    return this._secret;
  }

  get expirationTime(): string {
    return this._expirationTime;
  }

  setId(id: string) {
    this._id = id;
  }
}