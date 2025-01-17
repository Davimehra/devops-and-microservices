import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; feild?: string | undefined }[] {
    return [{ message: "Not Found" }];
  }
}
