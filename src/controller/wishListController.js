import User from "../modal/userModal.js";
import WishList from "../modal/wishlistModal.js";

// get All wishlist
const getAllWishlists = async (req, res) => {
  try {
    const data = await WishList.find({});
    return res.status(200).send({ message: "Successful", wishlist: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting all wishlist", error: error.message });
  }
};

// get wishlist Detail
const getWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // checking if user wishlistId match the params wishlistId
    if (user?.wishListId?.toString() !== wishlistId)
      return res
        .status(409)
        .send({ message: "user wishlist id does not match" });

    const data = await WishList.findById(wishlistId);
    if (!data) return res.status(404).send({ message: "No WishList Found" });
    return res.status(200).send({ message: "Successful", data: data });
  } catch (error) {
    return res.status(500).send({
      message: "Error getting WishList details",
      error: error.message,
    });
  }
};

// update wishlist
const addWishlistItem = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // only a buyer can add items to wishlist
    if (user?.role !== "buyer")
      return res.status(409).send({
        message: "Only buyer can add the product login with buyer account",
      });

    // checking if user wishlist id match the params wishlist id
    if (user?.wishListId.toString() !== wishlistId)
      return res
        .status(409)
        .send({ message: "user wishlist id does not match" });

    const preWish = await WishList.findById(wishlistId); // previous wishlist data if any
    let updatedWishlist = [];
    if (preWish?.items?.length !== 0) {
      const index = preWish?.items?.findIndex(
        (obj) => obj.product.toString() === req?.body?.item?.product
      );
      if (index !== -1) {
        if (req?.body?.item?.quantity) {
          preWish.items[index].quantity += req?.body?.item?.quantity;
        } else {
          preWish.items[index].quantity += 1;
        }
        updatedWishlist = [...preWish?.items];
      } else {
        updatedWishlist = [...preWish?.items, req?.body?.item];
      }
    } else updatedWishlist = [req?.body?.item];

    const wishlist = await WishList.findByIdAndUpdate(
      { _id: wishlistId },
      { items: updatedWishlist },
      { new: true }
    );

    return res.status(200).send({
      message: "Items added to WishList successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating wishlist", error: error.message });
  }
};

// Remove items from wishlist
const removeWishlistItem = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    // only a buyer can add items to wishlist
    if (user?.role !== "buyer")
      return res.status(409).send({
        message: "Only buyer can remove the product login with buyer account",
      });

    // checking if user wishlist id match the params wishlist id
    if (user?.wishListId.toString() !== wishlistId)
      return res
        .status(409)
        .send({ message: "user wishlist id does not match" });

    const preWish = await WishList.findById(wishlistId); // previous wishlist data

    let updatedWishlist = [];
    // for (let obj of req?.body?.item) {
    updatedWishlist = preWish?.items?.filter(
      (oldObj) => oldObj?.product.toString() !== req?.body?.item?.product
    );
    // }

    const wishlist = await WishList.findByIdAndUpdate(
      { _id: wishlistId },
      { items: updatedWishlist },
      { new: true }
    );

    return res.status(200).send({
      message: "Items removed from wishlist successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error deleting wishlist item", error: error.message });
  }
};

export { getAllWishlists, getWishlist, addWishlistItem, removeWishlistItem };
