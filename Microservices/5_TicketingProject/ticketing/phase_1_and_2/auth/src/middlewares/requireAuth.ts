import { Request, Response, NextFunction } from "express";
import { UnauthenticRequestError } from "../errors/unauthentic-request-error";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new UnauthenticRequestError();
  }

  next();
};

export { requireAuth };
