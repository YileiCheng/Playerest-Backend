import { Router } from "express";
import { getAllReviewsHandler } from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviewsHandler);

export default router;
