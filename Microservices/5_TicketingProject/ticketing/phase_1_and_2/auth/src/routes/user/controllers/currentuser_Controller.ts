import { Request, Response, NextFunction } from "express";

const currentuser_Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ currentUser:req.currentUser || null});
};

module.exports = { currentuser_Controller };
