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
categoryRouter.get("/:id", getCategories);
categoryRouter.post("/create", addCategories);
categoryRouter.patch("/:id", updateCategories);
categoryRouter.delete("/:id", removeCategories);

export default categoryRouter;
