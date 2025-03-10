import React from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  return (
    <div style={{ padding: "50px 200px" }}>
      {/* Dùng thẻ <h3> làm nút quay về trang chủ */}
      <h3
        style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}
        onClick={() => navigate("/")}
      >
        Trang chủ
      </h3>

      <ProductDetailsComponent />
    </div>
  );
};

export default ProductDetailsPage;
