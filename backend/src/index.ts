import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRoutes from "./routes/loginRoutes";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: ["https://kura-kani-main.vercel.app", "http://localhost:5173"],

  credentials: true,
};

app.use(cors(corsOptions));

app.use(clerkMiddleware());
app.use("/api", loginRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
