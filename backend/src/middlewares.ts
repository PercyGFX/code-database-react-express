import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const jwtauth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken) {
      next();
    } else {
      res.cookie("token", "", { expires: new Date(0) });
      res.clearCookie("token", { path: "/path" });

      res
        .status(401)
        .json({ success: false, message: "Auth failed. Please login again" });
    }
  } catch (error) {
    res.cookie("token", "", { expires: new Date(0) });
    res.clearCookie("token", { path: "/path" });

    res.status(401).json({ success: false, message: "Internal server error" });
  }
};
