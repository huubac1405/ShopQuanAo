import styled from "styled-components";

export const CategoryListWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5; /* Nền xám */
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Giúp danh mục xuống dòng khi không đủ chỗ */
  gap: 20px;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px; /* Cố định chiều rộng */
  min-height: 150px;
`;

export const CategoryImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
`;

export const CategoryName = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
