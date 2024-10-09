import { Router } from "express";
import {
  storeDraftHandler,
  publishDraftHandler,
} from "../controllers/draftController";

const router = Router();

router.post("/store", storeDraftHandler);

router.post("/publish", publishDraftHandler);

export default router;
