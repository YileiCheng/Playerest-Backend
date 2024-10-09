import { Router } from "express";
import {
  getAllCommentsHandler,
  getCommentsByReviewIdHandler,
} from "../controllers/commentController";

const router = Router();

router.get("/", getAllCommentsHandler);

router.post("/review", getCommentsByReviewIdHandler);

export default router;
