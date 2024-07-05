import express from "express";
import { authentication } from "../middleware/userMiddleware.js";
import {
  addCategories,
  getAllCategories,
  getCategories,
  removeCategories,
  updateCategories,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/details", getAllCategories);
categoryRouter.get("/:categoryId", getCategories);
categoryRouter.post("/create", addCategories);
categoryRouter.patch("/:categoryId", updateCategories);
categoryRouter.delete("/:categoryId", removeCategories);

export default categoryRouter;
