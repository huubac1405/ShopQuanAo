
const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
  try {
    const { name, image, type, price, sold, variants } = newProduct;

    // Kiểm tra input
    if (!name || !image || !type || !price || !sold || !variants || !Array.isArray(variants)) {
      return {
        status: "ERR",
        message: "Missing required fields or invalid variants format",
      };
    }

    // Kiểm tra sản phẩm đã tồn tại chưa
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return { status: "ERR", message: "Product already exists" };
    }

    // Tạo sản phẩm
    const createdProduct = await Product.create({
      name,
      image,
      type,
      price,
      sold,
      variants,
    });

    return { status: "OK", message: "Product created successfully", data: createdProduct };
  } catch (e) {
    console.error("Error in createProduct:", e);
    return { status: "ERROR", message: e.message || "Internal Server Error" };
  }
};

const updateProduct = async (id, data) => {
  try {
    const checkProduct = await Product.findById(id);
    if (!checkProduct) {
      return { status: "ERR", message: "Product not found" };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    return { status: "OK", message: "Product updated successfully", data: updatedProduct };
  } catch (e) {
    console.error("Error in updateProduct:", e);
    return { status: "ERROR", message: e.message || "Internal Server Error" };
  }
};

const deleteProduct = async (id) => {
  try {
    const checkProduct = await Product.findById(id);
    if (!checkProduct) {
      return { status: "ERR", message: "Product not found" };
    }

    await Product.findByIdAndDelete(id);
    return { status: "OK", message: "Product deleted successfully" };
  } catch (e) {
    console.error("Error in deleteProduct:", e);
    return { status: "ERROR", message: e.message || "Internal Server Error" };
  }
};

const getAllProduct = async (limit, page, sort, filter) => {
  try {
    limit = Number(limit) || 12;
    page = Number(page) || 0;
    let query = {}; // Mặc định lấy tất cả sản phẩm

    if (filter) {
      query[filter[0]] = { $regex: filter[1], $options: "i" };
    }

    const totalProduct = await Product.countDocuments(query);
    let productsQuery = Product.find(query).limit(limit).skip(page * limit);

    if (sort) {
      let sortObj = {};
      sortObj[sort[1]] = sort[0];
      productsQuery = productsQuery.sort(sortObj);
    }

    const productsList = await productsQuery;

    return {
      status: "OK",
      message: "SUCCESS",
      data: productsList,
      total: totalProduct,
      pageCurrent: page + 1,
      totalPage: Math.ceil(totalProduct / limit),
    };
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    return { status: "ERROR", message: e.message || "Internal Server Error" };
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return { status: "ERR", message: "Product not found" };
    }
    return { status: "OK", message: "SUCCESS", data: product };
  } catch (e) {
    console.error("Error in getProductById:", e);
    return { status: "ERROR", message: e.message || "Internal Server Error" };
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
};
