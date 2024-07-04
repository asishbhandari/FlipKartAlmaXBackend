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

productRouter.get("/detail", (req, res) => {
  res.status(200).send({ message: "product route working" });
});
productRouter.get("/details", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/addProduct", authentication, addProduct);
productRouter.patch("/:id", authentication, updateProducts);
productRouter.delete("/:id", authentication, removeProducts);

export default productRouter;
