import Category from "../modal/categoryModal.js";
import Product from "../modal/productModal.js";
import User from "../modal/userModal.js";

// Get all products
const perPageLimit = 10;
const initialPage = 0;
const getAllProducts = async (req, res) => {
  try {
    const { sort = null, search = "" } = req.query;
    const page = parseInt(req.query.page) - 1 || initialPage;
    const limit = parseInt(req.query.limit) || perPageLimit;

    let filter = {};
    filter.name = { $regex: search, $options: "i" };
    if (req.query?.category) {
      const categoryId = await Category.find({ name: req.query?.category });
      filter.category = categoryId;
    }
    if (req.query?.price) filter.price = { $gte: req.query?.price };
    if (req.query?.isAssured) filter.isAssured = req.query?.isAssured;
    if (req.query?.rating) filter.rating = { $gte: req.query?.rating };

    let data = await Product.find(filter)
      .populate("category", "name")
      .populate("sellerId", "name")
      .skip(page * limit)
      .limit(limit)
      .sort(sort);

    const length = data.length;
    return res
      .status(200)
      .send({ message: "successful", length: length, products: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error getting all products ", error: error.message });
  }
};

// get a single products
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data)
      return res
        .status(204)
        .send({ message: "No Product found with the given Id" });
    return res.status(200).send({ message: "successful", product: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error getting products ", error: error.message });
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    if (user?.role !== "seller")
      return res.status(409).send({
        message: "Only Seller can add the product login with seller account",
      });

    req.body.sellerId = userId;
    const product = await Product.create(req.body);

    return res.status(201).send({
      message: `Product added by the Seller ${user.name}`,
      productDetails: product,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Adding product", error: error.message });
  }
};

// Update a product
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    if (user?.role !== "seller")
      return res.status(409).send({
        message: "Only Seller can update the product login with seller account",
      });

    let product = await Product.findById(id);
    if (product.sellerId.toString() !== userId)
      return res
        .status(409)
        .send({ message: "unAuthorized to update other seller product" });
    product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ message: "Product details updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error updating products ", error: error.message });
  }
};

// Remove a product
const removeProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    if (user?.role !== "seller")
      return res.status(409).send({
        message: "Only Seller can delete the product login with seller account",
      });

    let product = await Product.findById(id);
    if (product?.sellerId.toString() !== userId)
      return res
        .status(409)
        .send({ message: "unAuthorized to delete other seller product" });

    await Product.findByIdAndDelete(id);
    return res.status(200).send({ message: "Product Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error deleting products ", error: error.message });
  }
};

export {
  addProduct,
  getAllProducts,
  getProduct,
  updateProducts,
  removeProducts,
};
