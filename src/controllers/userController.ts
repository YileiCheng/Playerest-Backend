import { Request, Response } from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../services/dynamoService";
import { signUp } from "aws-amplify/auth"

export const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve users" });
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { UserId, Password } = req.body;

  if (!UserId || !Password) {
    res.status(400).json({ error: "UserId and Password are required" });
    return;
  }

  try {
    const result = await loginUser(UserId, Password);
    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

export const registerUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { UserId, Password } = req.body;

  if (!UserId || !Password) {
    res.status(400).json({ error: "UserId and Password are required" });
    return;
  }

  try {
    const result = await registerUser(UserId, Password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const signUpHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Call AWS Amplify's signUp function
    const signUpResponse = await signUp({
      username: username,
      password: password,
      options: {
        userAttributes: {
          email: email,
        },
      }
    });

    res.status(201).json({
      message: 'User signed up successfully!',
      signUpResponse,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({
      message: 'Sign up failed',
      error: error,
    });
  }
};
