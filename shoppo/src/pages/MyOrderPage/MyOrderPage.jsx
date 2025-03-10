import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function MyOrderPage() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đang xem chi tiết

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/order/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Đơn hàng của tôi</h2>
      {orders.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalPrice.toLocaleString()}₫</td>
                <td>{order.orderStatus}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => setSelectedOrder(order)} style={styles.detailBtn}>
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có đơn hàng nào.</p>
      )}

      {selectedOrder && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Chi tiết đơn hàng</h3>
            {selectedOrder.items.map((item, index) => (
              <p key={index} style={styles.itemText}>
                <strong>Sản phẩm ID:</strong> {item.product} - <strong>Màu:</strong> {item.color} - <strong>Size:</strong> {item.size} - <strong>Số lượng:</strong> {item.quantity}
              </p>
            ))}
            <button onClick={() => setSelectedOrder(null)} style={styles.closeBtn}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
  },
  detailBtn: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  itemText: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  closeBtn: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default MyOrderPage;
