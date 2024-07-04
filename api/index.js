import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "../src/config/db.js";
import cookieParser from "cookie-parser";
import categoryRouter from "../src/routes/categoryRoutes.js";
import wishlistRouter from "../src/routes/wishlistRoutes.js";
import cartRouter from "../src/routes/cartRoutes.js";
import productRouter from "../src/routes/productRoutes.js";
import userRouter from "../src/routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to backend for flipKart Application");
});
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDb();
  console.log(`Listening on Port ${PORT}`);
});
