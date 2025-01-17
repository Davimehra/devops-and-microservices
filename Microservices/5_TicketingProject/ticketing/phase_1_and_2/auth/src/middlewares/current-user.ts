import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

interface userPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    // will be handled in Unauthentic Request handler
    return next();
  }

  const accessToken = req.session.jwt;

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};

export { currentUser };
