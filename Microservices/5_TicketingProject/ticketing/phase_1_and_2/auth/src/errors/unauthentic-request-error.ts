import { CustomError } from "./custom-error";

class UnauthenticRequestError extends CustomError {
  statusCode = 403;

  constructor() {
    super("Unauthentic Access Request");
    Object.setPrototypeOf(this, UnauthenticRequestError.prototype);
  }

  serializeErrors = () => {
    return [{ message: "Unauthentic Access Request" }];
  };
}

export { UnauthenticRequestError };
