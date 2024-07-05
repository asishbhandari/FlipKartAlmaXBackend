import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import connectDb from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRouter from "./src/routes/productRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import wishlistRouter from "./src/routes/wishlistRoutes.js";

// env configuration to use environment variables
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// using path and fileURLtoPath to redirect home page to the specified html file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "/public")));
app.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Page not found" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDb();
  console.log(`Listening on Port ${PORT}`);
});
