const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    sold: { type: Number, required: true, default: 0 }, // Mặc định là 0 nếu chưa bán sản phẩm nào

    // Mảng chứa các biến thể (theo màu và size)
    variants: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        countInStock: { type: Number, required: true, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
