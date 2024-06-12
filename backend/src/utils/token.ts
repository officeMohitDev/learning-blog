import { Request } from "express";

const getUserIdFromAuthorizationHeader = (req: Request) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return null; // No Authorization header found
    }
  
    const userId = authHeader.split(' ')[1]; // Extract the user ID part from the header
    return userId;
  };

  export default getUserIdFromAuthorizationHeader