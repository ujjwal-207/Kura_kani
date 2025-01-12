import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import { Request, Response } from "express";
import { StreamClient } from "@stream-io/node-sdk";

// export const users = async (req: Request, res: Response) => {
//   const auth = getAuth(req);
//   const userId = auth.userId;
//   if (!userId) {
//     return void res.status(400).json({ error: "Error: No signed-in user" });
//   }

//   // Use the userId to get information about the user
//   const user = await clerkClient.users.getUser(userId);
//   res.status(200).json(user);
//   // res.status(200).json(userId);
// }

export const token = async (req: Request, res: Response) => {
  const apiKey = process.env.API_KEY;
  const secret = process.env.API_SECRET;
  if (!apiKey || !secret) {
    return void res
      .status(500)
      .json({ error: "Error: API key or secret is not defined" });
  }
  const auth = getAuth(req);
  const userId = auth.userId;
  if (!userId) {
    return void res.status(400).json({ error: "Error: No signed-in user" });
  }

  // Use the userId to get information about the user
  const user = await clerkClient.users.getUser(userId);
  res.status(200).json(user);
  // res.status(200).json(userId);
  const streamClient = new StreamClient(apiKey, secret);

  const token = streamClient.generateUserToken({ user_id: user.id });
  res.status(200).json({ token });
};
