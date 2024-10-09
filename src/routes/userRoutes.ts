import { Router } from "express";
import {
  getAllUsersHandler,
  loginUserHandler,
  registerUserHandler,
  signUpHandler,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsersHandler);

router.post("/login", loginUserHandler);

router.post("/register", registerUserHandler);

router.post("/signup", signUpHandler);

export default router;
