import { Router } from 'express';
import { getAllReviewsHandler, uploadImageHandler } from "../controllers/reviewController";
import { uploadImage } from "../services/s3Service";

const router = Router();

router.get("/", getAllReviewsHandler);

router.post('/upload', uploadImage.single('image'), uploadImageHandler);

export default router;
