const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
  },

  asin: {
    type: String,
    required: [true, "can't be blank"],
  },
  position: {
    type: Number,
    required: [true, "can't be blank"],
    unique: true,
  },
  page: {
    type: Number,
    required: [true, "can't be blank"],
  },
  absolute_position: {
    type: Number,
    required: [true, "can't be blank"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
