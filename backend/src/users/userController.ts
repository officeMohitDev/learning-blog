import { NextFunction, Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, name } = req.body;

    return res.status(200).json({ username, email, password, name });
  } catch (error) {}
  res.send("register router");
};
