import { Request, Response } from "express";
import { getAllReviews } from "../services/dynamoService";
import { addReview } from "../services/dynamoService";
import { getReviewsByAuthor } from "../services/dynamoService";

export const getAllReviewsHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllReviews();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders" });
  }
};

export const addReviewHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { imageUrl, author, title, content, rate } = req.body;

  if (!author || !title || !content || !rate) {
    res
      .status(400)
      .json({ error: "author, title, content, and rate are required" });
  }

  try {
    const result = await addReview({ imageUrl, author, title, content, rate });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
};

export const getReviewsByAuthorHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { author, reviewId } = req.body;

  if (!author) {
    res.status(400).json({ error: "Author is required in the request body" });
  }

  try {
    const reviews = await getReviewsByAuthor(
      author,
      reviewId ? Number(reviewId) : undefined
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews by author" });
  }
};
