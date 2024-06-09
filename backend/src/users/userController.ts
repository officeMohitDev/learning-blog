import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "./userModal";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validators/auth-validator";
import { config } from "../config/config";
import { sign } from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password, name } = registerSchema.parse(req.body);

    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      const errr = createHttpError(
        400,
        "User with email or username already exist"
      );
      return next(errr);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      name: name,
      email: email,
      password: hashedPass,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error?.errors?.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors: formattedErrors[0] });
    }
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      const error = createHttpError(404, "no user exist for provided email");
      return next(error);
    }

    const isPassCorrect = await bcrypt.compare(password, user.password as string);

    if (!isPassCorrect) {
      const error = createHttpError(400, "username or password is incorrect");
      return next(error);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
