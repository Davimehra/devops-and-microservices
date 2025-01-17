import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../../errors/bad-request";
import { User } from "../../../models/UserModel";
import jwt from "jsonwebtoken";

const signup_Controller = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError("Email Already Exists");
  }

  const user = User.build({ email, password });
  await user.save();

  try {
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_KEY!
    );

    req.session = { jwt: accessToken };
  } catch (error) {
    console.error(error);
  }

  res.status(201);
  res.json(user);
};

module.exports = { signup_Controller };
