
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/product/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/product/delete/${productId}`);
      if (response.status === 200) {
        alert("Sản phẩm đã được xóa thành công");
        fetchProducts();
      } else {
        alert("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditedProduct({ ...product });
    setShowEditForm(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/update/${editedProduct._id}`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Sản phẩm đã được cập nhật");
        setShowEditForm(false);
        fetchProducts();
      } else {
        alert("Không thể cập nhật sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    sold: "",
    variants: [{ color: "", size: "", countInStock: 0 }],
  });

  const handleNewProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({ ...newProduct, [name]: type === "checkbox" ? checked : value });
  };

  const handleVariantChange = (index, field, value) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const handleAddVariant = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      variants: [...prevProduct.variants, { color: "", size: "", countInStock: 0 }],
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/product/create", newProduct);
      if (response.status === 200 || response.status === 201) {
        alert("Tạo sản phẩm thành công!");
        setShowAddProductForm(false);
        fetchProducts();
      } else {
        console.error("Tạo sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  const getTotalStock = (variants) => {
    return variants.reduce((total, variant) => total + variant.countInStock, 0);
  };

  const handleEditVariantChange = (index, field, value) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
      <aside style={{ width: "250px", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <h2>QUẢN LÝ HỆ THỐNG</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/admin" style={styles.link}>
              Quản lý người dùng
            </Link>
          </li>
          <li>
            <Link to="/admin/products" style={styles.link}>
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" style={styles.link}>
              Quản lí đơn hàng
            </Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Danh sách sản phẩm
          <button onClick={() => setShowAddProductForm(true)} style={styles.addUserBtn}>
            ➕ Thêm Sản Phẩm
          </button>
        </h2>
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Mã</th>
              {/* <th>Hình ảnh</th> */}
              <th>Tên sản phẩm</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Đã bán</th>
              <th>Tồn kho</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                {/* <td>
                  <img src={`http://localhost:5000${product.image}`} alt={product.name} style={styles.image} />
                </td> */}
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.price.toLocaleString()}₫</td>
                <td>{product.sold}</td>
                <td>{getTotalStock(product.variants)}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} style={styles.editBtn}>
                    Sửa
                  </button>
                  <button onClick={() => handleDeleteProduct(product._id)} style={styles.deleteBtn}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddProductForm && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Thêm Sản Phẩm</h3>
              <form onSubmit={handleCreateProduct}>
                <input type="text" name="name" placeholder="Tên sản phẩm" onChange={handleNewProductChange} required />
                <input type="text" name="image" placeholder="URL hình ảnh" onChange={handleNewProductChange} required />
                <input type="text" name="type" placeholder="Loại sản phẩm" onChange={handleNewProductChange} required />
                <input type="number" name="price" placeholder="Giá sản phẩm" onChange={handleNewProductChange} required />
                <input type="number" name="sold" placeholder="Số lượng đã bán" onChange={handleNewProductChange} required />

                {newProduct.variants.map((variant, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                      placeholder={`Màu sắc ${index + 1}`}
                      required
                    />
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      placeholder={`Kích thước ${index + 1}`}
                      required
                    />
                    <input
                      type="number"
                      value={variant.countInStock}
                      onChange={(e) => handleVariantChange(index, "countInStock", e.target.value)}placeholder={`Số lượng ${index + 1}`}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddVariant}>
                  Thêm Variant
                </button>
                <button type="submit">Tạo</button>
                <button type="button" onClick={() => setShowAddProductForm(false)}>
                  Hủy
                </button>
              </form>
            </div>
          </div>
        )}

        {showEditForm && (
          <div>
            <h3>Sửa Sản Phẩm</h3>
            <form onSubmit={handleUpdateProduct}>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                required
              />
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
                required
              />
              <input
                type="text"
                name="type"
                value={editedProduct.type}
                onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                required
              />
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                required
              />

              <h4>Variants</h4>
              {editedProduct.variants.map((variant, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => handleEditVariantChange(index, "color", e.target.value)}
                    placeholder={`Màu sắc ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) => handleEditVariantChange(index, "size", e.target.value)}
                    placeholder={`Kích thước ${index + 1}`}
                  />
                  <input
                    type="number"
                    value={variant.countInStock}
                    onChange={(e) => handleEditVariantChange(index, "countInStock", e.target.value)}
                    placeholder={`Số lượng ${index + 1}`}
                  />
                </div>
              ))}

              <button type="submit">Cập nhật</button>
              <button type="button" onClick={() => setShowEditForm(false)}>
                Hủy
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  addUserBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    display: "block",
    padding: "12px 20px",
    color: "#fff",
    textDecoration: "none",
    borderBottom: "1px solid #444",
    transition: "background 0.3s ease",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  editBtn: {
    backgroundColor: "#f1c40f",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    color: "#fff",
    borderRadius: "5px",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "400px",
  },
};

export default AdminProduct;