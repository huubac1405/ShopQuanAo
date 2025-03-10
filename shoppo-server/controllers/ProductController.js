
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, type, price, sold, variants } = req.body;

    // Kiểm tra đầu vào
    if (!name || !image || !type || !price || !sold || !variants || !Array.isArray(variants)) {
      return res.status(400).json({
        status: "ERR",
        message: "Missing required fields or invalid variants format",
      });
    }

    const result = await ProductService.createProduct(req.body);
    return res.status(201).json(result); // 201: Created
  } catch (e) {
    console.error("Error in createProduct:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal Server Error", 
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "Product ID is required",
      });
    }

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in updateProduct:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "Product ID is required",
      });
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in deleteProduct:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal Server Error",
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductService.getAllProduct(
      Number(limit) || 12,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "Product ID is required",
      });
    }

    const response = await ProductService.getProductById(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getProductById:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
};
