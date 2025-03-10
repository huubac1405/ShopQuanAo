import React from "react";
import styles from "./ProductList.module.css";

import slider1 from "../../assets/ao.png";
import slider2 from "../../assets/quan.png";
import slider3 from "../../assets/vay.png";

const products = [
  { id: 1, name: "Áo Thun", price: 189000, image: slider1 },
  { id: 2, name: "Áo Dài", price: 580000, image: slider2 },
  { id: 3, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 3, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 4, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 5, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 6, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 7, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 8, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 9, name: "Chân Váy", price: 199000, image: slider3 },
  { id: 10, name: "Chân Váy", price: 199000, image: slider3 }

];

const ProductList = () => {
  return (
    <div className={styles.productGrid} >
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.image} alt={product.name} />
          <h4>{product.name}</h4>
          <p>{product.price.toLocaleString()} đ</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
