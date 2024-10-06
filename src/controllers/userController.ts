import { Request, Response } from "express";
import { getAllUsers } from "../services/dynamoService";

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve users" });
  }
};
