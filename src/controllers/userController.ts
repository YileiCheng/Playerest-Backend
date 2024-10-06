import { Request, Response } from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../services/dynamoService";

export const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve users" });
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { UserId, Password } = req.body;

  if (!UserId || !Password) {
    res.status(400).json({ error: "UserId and Password are required" });
    return;
  }

  try {
    const result = await loginUser(UserId, Password);
    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

export const registerUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { UserId, Password } = req.body;

  if (!UserId || !Password) {
    res.status(400).json({ error: "UserId and Password are required" });
    return;
  }

  try {
    const result = await registerUser(UserId, Password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};
