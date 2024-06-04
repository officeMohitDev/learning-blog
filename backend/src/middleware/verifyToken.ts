import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

interface authRequest extends Request {
    user: string
}

// Middleware to verify JWT token from cookie
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the token from the cookie
      const authHeader = req.cookies.token;
      if (!authHeader) {
        const error = createHttpError(400, "Token is required")
        return next(error) // Unauthorized: No token found
      }
  
      // Verify the token
      jwt.verify(authHeader, config.secret as string, (err: any, decoded: any) => {
        if (err) {
            const error = createHttpError(404, "Token is invalid")
            return next(error); // Forbidden: Invalid token
        }
  
        // Token is valid, attach the decoded payload to the request object
        let _req = req as authRequest
        _req.user = decoded.id;
        next();
      });
    } catch (error) {
        return next(error)
    }
  };