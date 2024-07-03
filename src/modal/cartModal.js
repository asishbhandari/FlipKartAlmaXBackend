import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cartItems: [
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

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
