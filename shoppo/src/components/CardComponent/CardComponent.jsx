
import defaultImage from  "../../assets/ao.png" 

import PropTypes from "prop-types";
import { Card } from "antd";
import { StyleNameProduct, StylePriceProduct } from "./style";

import { useNavigate } from "react-router-dom";

const CardComponent = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/product-details/${product._id}`)}
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={`http://localhost:5000${product.image}`} />} 
      // cover={<img alt={product.name} src={ defaultImage} />}  
    >
      <StyleNameProduct>{product.name}</StyleNameProduct>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StylePriceProduct>{product.price.toLocaleString()} vnđ</StylePriceProduct>
        {product.price && (
          <del
            aria-hidden="true"
            style={{
              paddingLeft: "5px",
              fontSize: "14.4px",
              color: "rgb(17,17,17)",
              opacity: "0.5",
            }}
          >
            {(product.price * 1.2).toLocaleString()} vnđ
          </del>
        )}
      </div>
    </Card>
  );
};

// 🛠 Khai báo prop-types để tránh lỗi ESLint
CardComponent.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardComponent;

