import express from "express";
import { authentication } from "../middleware/userMiddleware.js";
import {
  addWishlistItem,
  getAllWishlists,
  getWishlist,
  removeWishlistItem,
} from "../controller/wishListController.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/details", getAllWishlists);
wishlistRouter.get("/:wishlistId", authentication, getWishlist);
wishlistRouter.patch("/addItems/:wishlistId", authentication, addWishlistItem);
wishlistRouter.patch(
  "/removeItems/:wishlistId",
  authentication,
  removeWishlistItem
);

export default wishlistRouter;
