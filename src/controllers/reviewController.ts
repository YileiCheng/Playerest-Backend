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

export const uploadImageHandler = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).send({
    message: 'Image uploaded successfully!',
    imageUrl: (req.file as any).location, // S3 image URL
  });
};