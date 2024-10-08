import { Request, Response } from "express";
import {
  getAllComments,
  getCommentsByReviewId,
} from "../services/dynamoService";

export const getAllCommentsHandler = async (req: Request, res: Response) => {
  try {
    const comments = await getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all comments" });
  }
};

export const getCommentsByReviewIdHandler = async (
  req: Request,
  res: Response
) => {
  const { reviewId } = req.body;

  if (!reviewId) {
    res.status(400).json({ error: "reviewId is required in the request body" });
  }

  try {
    const comments = await getCommentsByReviewId(Number(reviewId));
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching comments for reviewId ${reviewId}` });
  }
};
