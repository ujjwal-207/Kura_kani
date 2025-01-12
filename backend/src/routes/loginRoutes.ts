import "dotenv/config";
import express from "express";

import { tokens } from "../controllers/streamClient";

const router = express.Router();

router.get("/token", tokens);

export default router;
