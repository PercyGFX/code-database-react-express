import express from "express";
const router = express.Router();
import { register, login } from "../controllers/userController.js";

// login endpoint
router.post("/login", login);

// register endpoint

router.post("/register", register);

export default router;
