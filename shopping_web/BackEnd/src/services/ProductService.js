const Product = require("../models/product");
const mongoose = require("mongoose");

const addProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const getAllProducts = async () => {
  try {
    return await Product.find({ isDeleted: false }); // Lọc chỉ những sản phẩm chưa bị xóa
  } catch (err) {
    throw new Error("Cannot get product.");
  }
};

const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (err) {
    throw new Error("Cannot get product.");
  }
};

const removeProductById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID.");
    }
    console.log(id);
    const product = await Product.findByIdAndUpdate(id, { isDeleted: true });
    if (!product) return null;

    return product;
  } catch (err) {
    throw new Error("Error while deleting product");
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    // Cập nhật các trường dữ liệu của sản phẩm
    product.name = updatedData.name || product.name;
    product.image = updatedData.image || product.image;
    product.old_price = updatedData.old_price || product.old_price;
    product.new_price = updatedData.new_price || product.new_price;
    product.category = updatedData.category || product.category;
    product.size = updatedData.size || product.size;
    product.description = updatedData.description || product.description;

    await product.save();
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  removeProductById,
  updateProduct,
  getProductById,
};
