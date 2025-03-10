import React from "react";

import styles from "./ProductPage.module.css";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import ProductList from "../../components/ProductList/ProductList";

const ProductPage = () => {
  return (
    <div className={styles.container} style={{padding:"20px 120px"}}>
      <div className={styles.sidebar}>
        <FilterSidebar />
      </div>
      <div className={styles.content}>
        <SortBar />
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
