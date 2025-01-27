import { clerkClient, getAuth } from "@clerk/express";
import { StreamClient } from "@stream-io/node-sdk";
import { Request, Response, NextFunction } from "express";

export const tokens = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const apiKey = process.env.API_KEY;
  const secret = process.env.API_SECRET;
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const iat = Math.floor(Date.now() / 1000) - 300;

  if (!userId) {
    res.status(400).json({ error: "Error: No signed-in user" });
    return;
  }
  if (!apiKey || !secret) {
    res.status(400).json({ error: "Error:no api key" });
    return;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const streamClient = new StreamClient(apiKey, secret);
    const token = streamClient.generateUserToken({
      user_id: userId,
      exp,
      iat,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log("error in token generation", error);
    next(error);
  }
};
