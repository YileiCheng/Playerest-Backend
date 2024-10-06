import { Router } from "express";
import {
  getAllUsersHandler,
  loginUserHandler,
  registerUserHandler,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsersHandler);

router.post("/login", loginUserHandler);

router.post("/register", registerUserHandler);

export default router;
