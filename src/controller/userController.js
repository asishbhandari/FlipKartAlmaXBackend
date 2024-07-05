import Cart from "../modal/cartModal.js";
import Product from "../modal/productModal.js";
import User from "../modal/userModal.js";
import WishList from "../modal/wishlistModal.js";
import { generateToken, verifyToken } from "../utilities/jwt.js";

// Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser)
      return res.status(409).send({ message: "User Already Registered" });
    const user = await User.create({
      name,
      email,
      password,
    });
    const cart = await Cart.create({ userId: user._id.toString() });
    const wishlist = await WishList.create({ userId: user._id.toString() });
    await User.findOneAndUpdate(
      { _id: user._id },
      { cartId: cart, wishListId: wishlist }
    );
    return res.status(201).send({ message: "User Registered Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // if user is not found
    if (!user)
      return res
        .status(400)
        .send({ message: "User Not Found Kindly register" });
    const isPasswordCorrect = await user.comparePassword(password);

    // if password is incorrect
    if (!isPasswordCorrect)
      return res.status(409).send({ message: "InValid Credentials" });

    // if user is correct then generate token and pass it in cookies
    const token = generateToken({ userId: user.id });
    res.cookie("AccessToken", token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 2 * 3600000),
      sameSite: "none",
    });
    res.status(200).send({ message: "user logged in successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

// Logout Controller
const logout = async (req, res) => {
  try {
    res.clearCookie("AccessToken");
    return res.status(200).send({ message: "Logged Out Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while Logout", error: error.message });
  }
};

// update User
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // comparing id parameter with the token user id to confirm the user
    const userIdFromToken = res.locals.userId;
    if (userIdFromToken !== userId)
      return res.status(409).send({
        message:
          "Cannot update using other persons ID, login from your account",
      });

    if (req.body.hasOwnProperty("email"))
      return res.status(409).send({ message: "Email cannot be changed" });

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    if (!user) return res.status(404).send({ message: "User Not Found" });

    return res.status(200).send({ user: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting user", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // comparing id parameter with the token user id to confirm the user
    const userIdFromToken = res.locals.userId;
    if (userIdFromToken !== userId)
      return res.status(409).send({
        message: "Cannot delete other persons ID, login from your account",
      });

    const user = await User.findById(userId);
    await Cart.findOneAndDelete({ userId: user._id.toString() });
    await WishList.findOneAndDelete({
      userId: user._id.toString(),
    });
    await Product.findOneAndDelete({ sellerId: user._id.toString() });
    await User.findByIdAndDelete(id);
    return res.status(200).send({ message: "user Deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error While Deleting User", error: error.message });
  }
};

export { register, login, logout, updateUser, deleteUser };
