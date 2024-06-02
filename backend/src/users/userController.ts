import { NextFunction, Request, Response } from "express";

export const registerUser = async(req: Request, res:Response, next:NextFunction) => {
    res.send("register router")
}