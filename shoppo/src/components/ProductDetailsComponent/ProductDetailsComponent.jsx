
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./ProductDetailsComponent.css";
import defaultImage from "../../assets/ao.png";
import { useSelector } from "react-redux";

const ProductDetailsComponent = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const user = useSelector((state) => state.user)
  
  const handleAddToCart = async () => {
    try {
      if (!user?.id) throw new Error("Bạn cần đăng nhập!");
      if (!selectedColor || !selectedSize) throw new Error("Chọn màu sắc & kích thước!");
  
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, {
        userId: user.id,
        productId: id,
        color: selectedColor,
        size: selectedSize,
        quantity
      });
      console.log(res);
      
      alert("Đã thêm vào giỏ hàng!");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng!");
    }
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước!");
      return;
    }
    navigate("/order", {
      state: { 
        directProduct: {  // 🔥 Đúng format
          product: product,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
        }
      },
    });
  };
  

  const fetchProductDetails = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getById/${id}`);
    return res.data.data;
  };

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  if (isLoading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (isError || !product) return <p>Lỗi tải sản phẩm!</p>;

  // Lấy danh sách màu sắc và kích thước từ biến thể (variants)
  const availableColors = [...new Set(product.variants.map(v => v.color))];
  const availableSizes = [...new Set(product.variants.map(v => v.size))];

  // Lọc danh sách màu sắc dựa trên size đã chọn
  const filteredColors = selectedSize
    ? [...new Set(product.variants.filter(v => v.size === selectedSize).map(v => v.color))]
    : availableColors;

  // Lọc danh sách size dựa trên màu đã chọn
  const filteredSizes = selectedColor
    ? [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))]
    : availableSizes;

  // Tìm biến thể phù hợp với cả hai lựa chọn (nếu có)
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  // Số lượng tồn kho của biến thể được chọn
  const stockAvailable = selectedVariant ? selectedVariant.countInStock : 0;

  return (
    <div className="container">
      <div className="product-detail">
        {/* Ảnh sản phẩm */}
        <div className="main-image-container">
          <img src={`http://localhost:5000${product.image}`} 
               alt={product.name} 
               className="main-image" />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">
            <span className="current-price">{product.price.toLocaleString()} đ</span>
          </p>
          <p className="sold" style={{ fontSize: "15px" }}>Đã bán: {product.sold}</p>

          {/* Chọn màu sắc */}
          <div className="options">
            <h4>Chọn màu sắc</h4>
            <div className="color-options">
              {filteredColors.map((color, index) => (
                <button
                  key={index}
                  className={selectedColor === color ? "active" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn kích thước */}
          <div className="options">
            <h4>Chọn kích thước</h4>
            <div className="size-options">
              {filteredSizes.map((size, index) => (
                <button
                  key={index}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Hiển thị số lượng tồn kho */}
          {selectedVariant && (
            <p className="stock-info" style={{fontSize:'15px'}}>
              Số lượng còn: <strong>{stockAvailable > 0 ? stockAvailable : "Hết hàng"}</strong>
            </p>
          )}

          {/* Chọn số lượng */}
          {selectedVariant && stockAvailable > 0 && (
            <div className="quantity-selector">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => Math.min(prev + 1, stockAvailable))}>+</button>
            </div>
          )}

          {/* Nút mua hàng */}
          <div className="action-buttons">
            <button className="add-to-cart" disabled={!selectedVariant || stockAvailable === 0} onClick={() => handleAddToCart()}>
              Thêm vào giỏ hàng
            </button>
            <button className="buy-now" disabled={!selectedVariant || stockAvailable === 0} onClick={()=>handleBuyNow()}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;



