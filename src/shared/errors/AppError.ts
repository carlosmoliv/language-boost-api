export class AppError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(name: string, message: string, statusCode = 400) {
    super(message);

    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
