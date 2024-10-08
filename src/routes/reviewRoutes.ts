import { Router } from "express";
import {
  getAllReviewsHandler,
  addReviewHandler,
  getReviewsByAuthorHandler,
  searchReviewsHandler,
} from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviewsHandler);
router.post("/add", addReviewHandler);
router.post("/by-author", getReviewsByAuthorHandler);
router.post("/search", searchReviewsHandler);

export default router;
