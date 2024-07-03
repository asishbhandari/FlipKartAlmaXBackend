import Cart from "../modal/cartModal.js";
import User from "../modal/userModal.js";

// get All Carts
const getAllCarts = async (req, res) => {
  try {
    const data = await Cart.find({});
    return res.status(200).send({ message: "Successful", carts: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting all carts", error: error.message });
  }
};

// get Cart Detail
const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // checking if user cart id match the params cart id
    if (user?.cartId?.toString() !== cartId)
      return res.status(409).send({ message: "user Cart id does not match" });

    const data = await Cart.findById(cartId);
    if (!data) return res.status(404).send({ message: "No Cart Found" });
    return res.status(200).send({ message: "Successful", data: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting cart details", error: error.message });
  }
};

// update Cart
const addCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // only a buyer can add items to cart
    if (user?.role !== "buyer")
      return res.status(409).send({
        message: "Only buyer can add the product login with buyer account",
      });

    // checking if user cart id match the params cart id
    if (user?.cartId.toString() !== cartId)
      return res.status(409).send({ message: "user cart id does not match" });

    const preCart = await Cart.findById(cartId); // previous cart data if any
    // req.body.userId = userId;
    let updatedCart = [];
    if (preCart?.cartItems?.length !== 0) {
      const index = preCart?.cartItems?.findIndex(
        (obj) => obj.product.toString() === req?.body?.item?.product
      );
      if (index !== -1) {
        if (req?.body?.item?.quantity) {
          preCart.cartItems[index].quantity += req?.body?.item?.quantity;
        } else {
          preCart.cartItems[index].quantity += 1;
        }
        updatedCart = [...preCart?.cartItems];
      } else {
        // updatedWishlist = [...preCart?.cartItems, req?.body?.item];
        updatedCart = [...preCart?.cartItems, req?.body?.item];
      }
    } else updatedCart = [req?.body?.item];

    const cart = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { cartItems: updatedCart },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Items added to Cart successfully", cart: cart });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating cart", error: error.message });
  }
};

// Remove items from cart
const removeCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // only a buyer can add items to cart
    if (user?.role !== "buyer")
      return res.status(409).send({
        message: "Only buyer can remove the product login with buyer account",
      });

    // checking if user cart id match the params cart id
    if (user?.cartId.toString() !== cartId)
      return res.status(409).send({ message: "user cart id does not match" });

    const preCart = await Cart.findById(cartId); // previous cart data

    let updatedCart = [];
    // for (let obj of req?.body?.item) {
    updatedCart = preCart?.cartItems?.filter(
      (oldObj) => oldObj?.product.toString() !== req?.body?.item?.product
    );
    // }

    const cart = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { cartItems: updatedCart },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Items removed from Cart successfully", cart: cart });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error deleting cart item", error: error.message });
  }
};

export { getAllCarts, getCart, addCartItem, removeCartItem };
