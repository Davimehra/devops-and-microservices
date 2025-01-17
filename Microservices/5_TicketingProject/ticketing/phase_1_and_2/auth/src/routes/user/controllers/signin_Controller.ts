import { User } from "../../../models/UserModel";
import { Request, Response } from "express";
import { Password } from "../../../services/Password";
import { BadRequestError } from "../../../errors/bad-request";

import jwt from "jsonwebtoken";

const signin_Controller = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).exec();

  if (!existingUser) {
    throw new BadRequestError("Invalid Credentials");
  }

  const passMatch = await Password.compare(existingUser.password, password);

  if (!passMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  try {
    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_KEY!
    );

    req.session = { jwt: accessToken };
  } catch (error) {
    console.error(error);
  }

  res.status(200);
  res.json(existingUser);
};

module.exports = { signin_Controller };
