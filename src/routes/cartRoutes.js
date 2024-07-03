import express from "express";
import { authentication } from "../middleware/userMiddleware.js";
import {
  addCartItem,
  getAllCarts,
  getCart,
  removeCartItem,
} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/details", getAllCarts);
cartRouter.get("/:cartId", authentication, getCart);
cartRouter.patch("/addItems/:cartId", authentication, addCartItem);
cartRouter.patch("/removeItems/:cartId", authentication, removeCartItem);

export default cartRouter;
