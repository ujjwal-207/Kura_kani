import "dotenv/config";
import express from "express";

import { tokens } from "../controllers/streamClient";

const router = express.Router();

router.options("/token", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://kura-kani-main.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // No content
});

router.get("/token", (req, res, next) => {
  console.log("GET /token route hit");
  tokens(req, res, next);
});

export default router;
