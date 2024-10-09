import { Router } from "express";
import {
  getAllUsersHandler,
  // loginUserHandler,
  // registerUserHandler,
  signUpHandler,
  signInHandler
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsersHandler);

// router.post("/login", loginUserHandler);

// router.post("/register", registerUserHandler);

router.post("/signup", signUpHandler);

router.post("/signin", signInHandler);

export default router;
