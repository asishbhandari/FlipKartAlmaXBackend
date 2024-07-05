import express from "express";
import { authentication } from "../middleware/userMiddleware.js";
import {
  addProduct,
  getAllProducts,
  getProduct,
  removeProducts,
  updateProducts,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/details", getAllProducts);
productRouter.get("/:productId", getProduct);
productRouter.post("/addProduct", authentication, addProduct);
productRouter.patch("/:productId", authentication, updateProducts);
productRouter.delete("/:productId", authentication, removeProducts);

export default productRouter;
