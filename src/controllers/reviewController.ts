import { Request, Response } from "express";
import { getAllReviews } from "../services/dynamoService";

export const getAllReviewsHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllReviews();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders" });
  }
};
