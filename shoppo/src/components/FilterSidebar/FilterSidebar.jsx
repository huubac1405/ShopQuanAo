import React from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = () => {
  return (
    <div className={styles.sidebar} style={{fontSize:'18px'}}>
      <h3>Danh Mục</h3>
      <ul style={{display:'flex'}}>
        <li>Áo</li>
        <li>Quần</li>
        <li>Váy</li>
        <li>Túi xách</li>
      </ul>

      <h3>Màu Sắc</h3>
      <div className={styles.colors}>
        {["Be", "Đen", "Hồng", "Tím", "Vàng", "Xanh lá"].map((color) => (
          <span key={color} className={styles.colorItem}>{color}</span>
        ))}
      </div>

      <h3>Size</h3>
      <div className={styles.sizes}>
        {["S", "M", "L", "XL"].map((size) => (
          <label key={size}>
            <input type="checkbox" /> {size}
          </label>
        ))}
      </div>
      <button className={styles.applyButton}>Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;
