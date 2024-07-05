import Category from "../modal/categoryModal.js";

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    const length = data.length;
    return res.status(200).send({ message: "successful", length, data: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting all categories", error: error.message });
  }
};

// get a category
const getCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await Category.findById(categoryId);
    if (!data)
      return res
        .status(200)
        .send({ message: "no Such Category fond, Try adding it." });
    return res.status(200).send({ message: "successful", data: data });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting categories", error: error.message });
  }
};

// Add a category
const addCategories = async (req, res) => {
  try {
    const ifExists = await Category.find(req.body);
    if (ifExists.length > 0) {
      return res.status(409).send({ message: "category already exits" });
    }
    await Category.create(req.body);
    return res.status(201).send({ message: "category created successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error adding categories", error: error.message });
  }
};

// update a category
const updateCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await Category.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send({ message: "Category updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating categories", error: error.message });
  }
};

// remove a category
const removeCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    return res.status(202).send({ message: "category Deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error removing categories", error: error.message });
  }
};

export {
  getAllCategories,
  getCategories,
  addCategories,
  updateCategories,
  removeCategories,
};
