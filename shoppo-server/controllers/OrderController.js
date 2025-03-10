
const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel"); // Import Product

const createOrder = async (req, res) => {
  try {
    const { userId, shippingInfo, items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống!" });
    }

    // 🔥 Debug log để kiểm tra dữ liệu nhận được
    console.log("Received order:", req.body);

    let totalPrice = total; // ✅ Sử dụng giá trị total từ request

    // Kiểm tra từng sản phẩm
    const processedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId).populate("variants");

      if (!product) {
        return res.status(400).json({ message: `Sản phẩm không tồn tại!` });
      }

      const variant = product.variants.find(
        (v) => v.color === item.color && v.size === item.size
      );

      if (!variant) {
        return res.status(400).json({ message: `Không tìm thấy biến thể sản phẩm!` });
      }

      if (variant.countInStock < item.quantity) {
        return res.status(400).json({ message: `Sản phẩm không đủ hàng!` });
      }

      // Giảm số lượng tồn kho
      variant.countInStock -= item.quantity;
      await product.save();

      return {
        product: product._id,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: product.price, // ✅ Đảm bảo có giá
      };
    }));

    // ✅ Kiểm tra lại totalPrice trước khi lưu
    if (isNaN(totalPrice) || totalPrice <= 0) {
      return res.status(400).json({ message: "Tổng tiền không hợp lệ!" });
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      user: userId,
      items: processedItems,
      shippingInfo,
      totalPrice,
      shippingFee: 0,
    });

    await newOrder.save();

    res.status(201).json({ message: "Đặt hàng thành công!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Lấy danh sách đơn hàng của người dùng
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const validStatuses = ["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Đã giao", "Đã hủy"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ!" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" });

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ message: "Cập nhật trạng thái đơn hàng thành công!", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại!" });

    res.status(200).json({ message: "Xóa đơn hàng thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find().sort({ createdAt: -1 }); 
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng",
      error: error.message,
    });
  }
};



module.exports = { createOrder, getOrdersByUser, updateOrderStatus, deleteOrder, getAllOrders };
