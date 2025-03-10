
// import PropTypes from "prop-types";
// import {
//   CategoryListWrapper,
//   CategoriesWrapper,
//   CategoryItem,
//   CategoryImage,
//   CategoryName,
// } from "./style.js";

// import slider1 from "../../assets/ao.png";
// import slider2 from "../../assets/quan.png";
// import slider3 from "../../assets/vay.png";
// import slider4 from "../../assets/tuixach2.png";

// const categories = [
//   { id: 1, name: "Áo", type: "ao", image: slider1 },
//   { id: 2, name: "Quần", type: "quan", image: slider2 },
//   { id: 3, name: "Váy", type: "vay", image: slider3 },
//   { id: 4, name: "Túi xách", type: "tuiXach", image: slider4 },
// ];

// const CategoryList = ({ onSelectCategory }) => {
//   return (
//     <CategoryListWrapper>
//       <h1>DANH MỤC SẢN PHẨM</h1>
//       <CategoriesWrapper>
//         {categories.map((category) => (
//           <CategoryItem key={category.id} onClick={() => onSelectCategory(category.type)}>
//             <CategoryImage src={category.image} alt={category.name} />
//             <CategoryName>{category.name}</CategoryName>
//           </CategoryItem>
//         ))}
//       </CategoriesWrapper>
//     </CategoryListWrapper>
//   );
// };

// CategoryList.propTypes = {
//   onSelectCategory: PropTypes.func.isRequired,
// };

// export default CategoryList;

import { useState } from "react";
import PropTypes from "prop-types";
import {
  CategoryListWrapper,
  CategoriesWrapper,
  CategoryItem,
  CategoryImage,
  CategoryName,
} from "./style.js";

import slider1 from "../../assets/ao.png";
import slider2 from "../../assets/quan.png";
import slider3 from "../../assets/vay.png";
import slider4 from "../../assets/tuixach2.png";

const categories = [
  { id: 1, name: "Áo", type: "ao", image: slider1 },
  { id: 2, name: "Quần", type: "quan", image: slider2 },
  { id: 3, name: "Váy", type: "vay", image: slider3 },
  { id: 4, name: "Túi xách", type: "tuiXach", image: slider4 },
];

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // 🔹 Lưu danh mục đã chọn

  const handleSelect = (categoryType) => {
  // Nếu danh mục đang chọn bị click lại => Bỏ chọn (hiển thị tất cả)
  if (selectedCategory === categoryType) {
    setSelectedCategory("");
    onSelectCategory(""); // Trả về danh mục rỗng để lấy tất cả sản phẩm
  } else {
    setSelectedCategory(categoryType);
    onSelectCategory(categoryType);
  }
};


  return (
    <CategoryListWrapper>
      <h1>DANH MỤC SẢN PHẨM</h1>
      <CategoriesWrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            onClick={() => handleSelect(category.type)}
            style={{            
              border: selectedCategory === category.type ? "2px solid #FF4500" : "1px solid #ddd", // 🔹 Thêm viền khi chọn
            }}
          >
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryName>{category.name}</CategoryName>
          </CategoryItem>
        ))}
      </CategoriesWrapper>
    </CategoryListWrapper>
  );
};

CategoryList.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryList;


