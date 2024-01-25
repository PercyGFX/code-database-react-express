import express from "express";
const router = express.Router();
import { submitComplain } from "../controllers/complainController.js";

import { jwtauth } from "../middlewares.js";

// submit complain
router.post("/submitComplain", jwtauth, submitComplain);

export default router;
