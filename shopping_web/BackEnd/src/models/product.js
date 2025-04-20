const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    old_price: { type: String, required: true },
    new_price: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: [String], required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
