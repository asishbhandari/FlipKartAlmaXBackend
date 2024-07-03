import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WishList = mongoose.model("wishList", wishListSchema);
export default WishList;
