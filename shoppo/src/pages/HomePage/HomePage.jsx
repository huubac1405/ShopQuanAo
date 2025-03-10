
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CategoryList from "../../components/CategoryList/CategoryList";
import CardComponent from "../../components/CardComponent/CardComponent";

import slider5 from "../../assets/slider5.jpg";
import slider6 from "../../assets/slider6.jpg";

const HomePage = () => {
  const [page, setPage] = useState(0); // 🔹 Backend tính page từ 0
  const [category, setCategory] = useState(""); // 🔹 Lưu danh mục đã chọn
  const limit = 6; // Số sản phẩm mỗi trang

  const fetchProductAll = async ({ queryKey }) => {
    const [_key, page, category] = queryKey;
    try {
      const params = {
        limit,
        page,
      };

      if (category) {
        params.filter = ["type", category]; // 🔹 Gửi filter dạng mảng ['type', 'ao']
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`, { params });

      return res.data;
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      throw error;
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", page, category], // 🔹 Khi category/page thay đổi, gọi lại API
    queryFn: fetchProductAll,
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <>
      <SliderComponent arrImages={[slider5, slider6]} />

      <CategoryList
        onSelectCategory={(selectedCategory) => {
          setCategory(selectedCategory);
          setPage(0); // 🔹 Reset về trang đầu khi đổi danh mục
        }}
      />

      <h1 style={{ textAlign: "center", marginTop: "10px" }}>Danh sách sản phẩm</h1>

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px 120px" }}>
            {data?.data.length > 0 ? (
              data?.data.map((product) => <CardComponent key={product._id} product={product} />)
            ) : (
              <p style={{ textAlign: "center" }}>🛒 Không có sản phẩm nào!</p>
            )}
          </div>

          {/* PHÂN TRANG */}
          <div style={{ textAlign: "center", marginTop: "10px", paddingBottom: "20px" }}>
            <button disabled={page === 0} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
              ◀ Trang Trước
            </button>
            <span style={{ margin: "0 10px" }}>
              Trang {data?.pageCurrent} / {data?.totalPage}
            </span>
            <button
              disabled={data?.pageCurrent >= data?.totalPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Trang Sau ▶
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;











