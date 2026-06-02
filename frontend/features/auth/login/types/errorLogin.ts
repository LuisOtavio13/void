export class ErrorLogin extends Error {
  status: number;

  constructor(message: string | string[], status: number) {
    super(Array.isArray(message) ? message.join(", ") : message);
    this.status = status;
    this.name = "ErrorLogin";
  }

  isValidationError() {
    return this.status === 400;
  }
}
