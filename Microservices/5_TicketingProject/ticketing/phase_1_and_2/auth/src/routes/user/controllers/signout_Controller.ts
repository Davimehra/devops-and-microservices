import { Request, Response } from "express";

const signout_Controller = async (req: Request, res: Response) => {
  req.session = null;

  res.status(200);
  res.json({});
};

export { signout_Controller };
