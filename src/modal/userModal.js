import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: false },
    contactNumber: { type: String, required: false },
    address: { type: String, required: false },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    wishListId: { type: mongoose.Schema.Types.ObjectId, ref: "WishList" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("Error Hashing Password", error.message);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log("Error Matching Password", error.message);
    next(error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
