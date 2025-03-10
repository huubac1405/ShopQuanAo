const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người mua

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Giá tại thời điểm đặt hàng
      }
    ],

    shippingInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      address: { type: String, required: true },
    },

    totalPrice: { type: Number, required: true }, // Tổng tiền đơn hàng
    shippingFee: { type: Number, default: 0 }, // Phí vận chuyển

    paymentMethod: {
      type: String,
      enum: ["cod"], // Chỉ hỗ trợ thanh toán khi nhận hàng
      default: "cod",
    },

    orderStatus: {
      type: String,
      enum: ["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Đã giao", "Đã hủy"],
      default: "Chờ xác nhận",
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
