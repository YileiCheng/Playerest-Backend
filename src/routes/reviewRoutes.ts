import { Router } from "express";
import {
  getAllReviewsHandler,
  addReviewHandler,
  getReviewsByAuthorHandler,
} from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviewsHandler);
router.post("/add", addReviewHandler);
router.post("/by-author", getReviewsByAuthorHandler);

export default router;
