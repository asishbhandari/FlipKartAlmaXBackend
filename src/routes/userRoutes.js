import express from "express";
import { authentication } from "../middleware/userMiddleware.js";
import {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", authentication, logout);
userRouter.patch("/:id", authentication, updateUser);
userRouter.get("/:id", authentication, deleteUser);

export default userRouter;
