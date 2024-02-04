import express from "express";
const router = express.Router();
import { submitComplain, search } from "../controllers/complainController.js";

import { jwtauth } from "../middlewares.js";

// submit complain
router.post("/submitComplain",  submitComplain);

// search complain
router.post("/search", search);

export default router;
