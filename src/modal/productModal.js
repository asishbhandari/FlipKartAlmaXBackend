import mongoose, { Mongoose } from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    productImage: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
    isAssured: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
