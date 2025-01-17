import { CustomError } from "../errors/custom-error";
import { Request, Response, NextFunction } from "express";
export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode);
    return res.send({ errors: err.serializeErrors() });
  }

  res.status(400);
  return res.send([{ message: "Something Went Wrong" }]);
};
