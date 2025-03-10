import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order/getAll");
      setOrders(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng", error);
    }
  };
  const handleUpdateStatus = async (orderId) => {
    if (!newStatus) return;
    try {
      await axios.put("http://localhost:5000/api/order/status", { orderId, status: newStatus });
      setEditingOrderId(null);
      fetchOrders(); // Reload danh sách đơn hàng
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng", error);
    }
  };
  const handleViewDetails = (order) => {
    console.log("Selected Order:", order);
    setSelectedOrder(order);
  };
  
  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: "250px", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <h2>QUẢN LÝ HỆ THỐNG</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/admin" style={styles.link}>Quản lý người dùng</Link></li>
          <li><Link to="/admin/products" style={styles.link}>Quản lý sản phẩm</Link></li>
          <li><Link to="/admin/orders" style={styles.link}>Quản lí đơn hàng</Link></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <h2>Danh sách đơn hàng</h2>
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thời gian đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.shippingInfo.name}</td>
                <td>{order.shippingInfo.phone}</td>
                <td>{`${order.shippingInfo.address}, ${order.shippingInfo.ward}, ${order.shippingInfo.district}, ${order.shippingInfo.province}`}</td>
                <td>{order.totalPrice.toLocaleString()}₫</td>
                <td>
                  {editingOrderId === order._id ? (
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      {["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Đã giao", "Đã hủy"].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    order.orderStatus
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {editingOrderId === order._id ? (
                    <button style={styles.updateBtn} onClick={() => handleUpdateStatus(order._id)}>Lưu</button>
                  ) : (
                    <button style={styles.updateBtn} onClick={() => setEditingOrderId(order._id)}>Cập nhật</button>
                  )}
                  <button style={styles.detailBtn} onClick={() => handleViewDetails(order)}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedOrder && (
          <>
            <div style={styles.overlay} onClick={() => setSelectedOrder(null)}></div>
            <div style={styles.modal}>
              <h3>Chi tiết đơn hàng</h3>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index} style={styles.itemText}>
                    Sản phẩm ID: {item.product} - Màu: {item.color} - Size: {item.size} - Số lượng: {item.quantity}
                  </li>
                ))}
              </ul>
              <button style={styles.closeBtn} onClick={() => setSelectedOrder(null)}>Đóng</button>
            </div>
          </>
        )}



      </main>
    </div>
  );
}

const styles = {
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    width: "400px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  closeBtn: {
    marginTop: "15px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  itemText: {
    color: "#8e44ad",
    fontSize: "16px",
    margin: "10px 0",
  },
  link: {
    display: "block",
    padding: "12px 20px",
    color: "#fff",
    textDecoration: "none",
    borderBottom: "1px solid #444",
    transition: "background 0.3s ease",
  },
  detailBtn: {
    backgroundColor: "#3498db",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
    color: "#fff",
  },
  updateBtn: {
    backgroundColor: "#2ecc71",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    color: "#fff",
    borderRadius: "5px",
  },
};

export default AdminOrder;
