import "dotenv/config";
import express from "express";
import { clerkClient, requireAuth } from "@clerk/express";
import { signIn } from "../controllers/loginControllers";

const router = express.Router();

router.get("/sign-in", signIn);
