const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, color, size, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại!" });

    const variant = product.variants.find(v => v.color === color && v.size === size);
    if (!variant) return res.status(400).json({ message: "Biến thể không hợp lệ!" });

    if (variant.countInStock < quantity) return res.status(400).json({ message: "Không đủ hàng!" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.product.toString() === productId && item.color === color && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, color, size, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Đã thêm vào giỏ hàng!", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, color, size, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && item.color === color && item.size === size
    );

    if (itemIndex === -1) return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" });

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ message: "Cập nhật giỏ hàng thành công!", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId, color, size } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && item.color === color && item.size === size
    );

    if (itemIndex === -1) return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" });

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công!", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem };
