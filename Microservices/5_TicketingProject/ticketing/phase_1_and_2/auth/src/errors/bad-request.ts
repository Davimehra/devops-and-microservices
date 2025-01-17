import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public ErrorMessage: string) {
    super(ErrorMessage);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; feild?: string | undefined }[] {
    return [{ message: this.ErrorMessage }];
  }
}
