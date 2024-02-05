import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const jwtauth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    console.log(authorizationHeader);

    if (!authorizationHeader) {
      return res
        .status(401)
        .json({
          success: false,
          token: false,
          message: "Authorization header missing",
        });
    }

    const token = authorizationHeader.split(" ")[1]; // Extract the token part

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken) {
      next();
    } else {
      res
        .status(401)
        .json({
          success: false,
          token: false,
          message: "Auth failed. Please login again",
        });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Internal server error" });
  }
};
