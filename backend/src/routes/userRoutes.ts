import express from "express";
const router = express.Router();
import {
  register,
  login,
  profilecomplete,
} from "../controllers/userController.js";

// login endpoint
router.post("/login", login);

// register endpoint

router.post("/register", register);

// profile complete endpoint

router.post("/profilecomplete", profilecomplete);

export default router;
