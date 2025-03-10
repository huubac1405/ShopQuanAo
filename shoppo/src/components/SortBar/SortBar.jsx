import React from "react";
import styles from "./SortBar.module.css";

const SortBar = () => {
  return (
    <div className={styles.sortBar}>
      <span>160 sản phẩm</span>
      <select>
        <option>Mới nhất</option>
        <option>Giá tăng dần</option>
        <option>Giá giảm dần</option>
      </select>
    </div>
  );
};

export default SortBar;
