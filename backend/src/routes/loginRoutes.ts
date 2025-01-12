import "dotenv/config";
import express from "express";
import { clerkClient, requireAuth } from "@clerk/express";

import { token } from "../controllers/streamClient";

const router = express.Router();

router.get("/token", token);

export default router;
