import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRouter from "./src/routes/productRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import wishlistRouter from "./src/routes/wishlistRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

console.log("Welcome");
console.info("Welcome");
app.get("/", (req, res) => {
  res.status(200).send("Welcome to backend for flipKart Application");
});
app.get("/api/ping", (req, res) => {
  res.status(200).send("pong");
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
  console.info(`Listening on Port ${PORT}`);
});
