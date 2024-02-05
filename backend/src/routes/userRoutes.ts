import express from "express";
const router = express.Router();
import {
  register,
  login,
  profilecomplete,
  profilecheck,
} from "../controllers/userController.js";

import { jwtauth } from "../middlewares.js";

// login endpoint
router.post("/login", login);

// register endpoint

router.post("/register", register);

// profile complete endpoint

router.post("/profilecomplete", jwtauth, profilecomplete);

// profile complete check

router.post("/profilecheck", profilecheck);

export default router;
