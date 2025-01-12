import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const tokens = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    res.status(400).json({ error: "Error: No signed-in user" });
    return;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "user authenticated", user });
  } catch (error) {
    console.log("error in token generation", error);
    next(error);
  }
};
