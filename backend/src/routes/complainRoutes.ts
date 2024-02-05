import express from "express";
const router = express.Router();
import { submitComplain, search } from "../controllers/complainController.js";

import { jwtauth } from "../middlewares.js";

// submit complain
router.post("/submitComplain", jwtauth, submitComplain);

// search complain
router.post("/search", jwtauth, search);

export default router;
