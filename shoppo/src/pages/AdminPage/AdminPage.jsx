import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const styles = {
  addUserBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
    borderRadius: "10px",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidebarMenu: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    border: "1px solid #444",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#222",
  },
  link: {
    display: "block",
    padding: "12px 20px",
    color: "#fff",
    textDecoration: "none",
    borderBottom: "1px solid #444",
    transition: "background 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#555",
  }
};



function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    phone: '',
    isAdmin: false,
  });

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", pass: "",comfirmPass:"", phone: "", isAdmin: false });

const handleNewUserChange = (e) => {
  const { name, value, type, checked } = e.target;
  setNewUser({ ...newUser, [name]: type === "checkbox" ? checked : value });
};

const handleCreateUser = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post("http://localhost:5000/api/user/register", newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response từ API:", response);

    if (response.status === 200 || response.status === 201) {
      alert("Tạo người dùng thành công!");
      setShowAddUserForm(false);
      fetchUsers(); // Cập nhật danh sách user
    } else {
      console.error("Tạo người dùng thất bại");
    }
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/getAll', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      pass: user.pass, // Không hiển thị mật khẩu cũ
      phone: user.phone || '',
      isAdmin: user.isAdmin,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/user/update/${editingUser}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa người dùng này?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng', error);
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', fontSize:'16px'}}>
      

<aside style={{ width: "250px", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
  <h2>QUẢN LÝ HỆ THỐNG</h2>
  <ul style={styles.sidebarMenu}>
  <li><Link to="/admin" style={styles.link}>Quản lý người dùng</Link></li>
  <li><Link to="/admin/products" style={styles.link}>Quản lý sản phẩm</Link></li>
  <li><Link to="/admin/orders" style={styles.link}>Quản lí đơn hàng</Link></li>
</ul>
</aside>


      <main style={{ flex: 1, padding: '20px' }}>
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  Danh sách người dùng
  <button onClick={() => setShowAddUserForm(true)} style={styles.addUserBtn}>➕ Thêm Người Dùng</button>
</h2>

        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>Mã</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Mật khẩu</th>
              <th>Số điện thoại</th>
              <th>Admin</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>******</td>
                <td>{user.phone || 'Chưa có'}</td>
                <td>{user.isAdmin ? '✔️' : '❌'}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Sửa</button>
                  <button onClick={() => handleDelete(user._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
            <h3>Chỉnh sửa người dùng</h3>
            <form onSubmit={handleSubmit}>
              <label>Tên: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
              <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
              <label>Mật khẩu: <input type="pass" name="pass" value={formData.pass} onChange={handleChange} /></label>
              <label>Số điện thoại: <input type="text" name="phone" value={formData.phone} onChange={handleChange} /></label>
              <label>Admin: <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} /></label>
              <button type="submit">Lưu</button>
              <button onClick={() => setEditingUser(null)}>Hủy</button>
            </form>
          </div>
        )}

{showAddUserForm && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      <h3>Thêm Người Dùng</h3>
      <form onSubmit={handleCreateUser}>
        <input type="text" name="name" placeholder="Tên" onChange={handleNewUserChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleNewUserChange} required />
        <input type="pass" name="pass" placeholder="Mật khẩu" onChange={handleNewUserChange} required />
        <input type="comfirmPass" name="comfirmPass" placeholder="Xác nhận mật khẩu" onChange={handleNewUserChange} required />
        <input type="phone" name="phone" placeholder="Số điện thoại" onChange={handleNewUserChange} required />
        <label>
          Admin:
          <input type="checkbox" name="isAdmin" onChange={handleNewUserChange} />
        </label>
        <button type="submit">Tạo</button>
        <button type="button" onClick={() => setShowAddUserForm(false)}>Hủy</button>
      </form>
    </div>
  </div>
)}


      </main>
    </div>
  );
}

export default AdminPage;





