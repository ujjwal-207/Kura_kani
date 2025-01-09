import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

app.use(clerkMiddleware());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import { StreamClient } from "@stream-io/node-sdk";
// or
// const { StreamClient } = require("@stream-io/node-sdk");

// const apiKey = process.env.API_KEY;
// const secret = process.env.API_SECRET;
// const streamClient = new StreamClient(apiKey, secret);

// optionally add timeout to API requests
// the default timeout is 3000ms
// const client = new StreamClient(apiKey, secret, { timeout: 3000 });
