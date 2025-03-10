import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Cart() {
    const user = useSelector((state) => state.user);
    console.log("User:", user);

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${user.id}`);
          const data = await response.json();
          console.log('Dữ liệu giỏ hàng nhận được:', data);
      
          // Không cần kiểm tra data.items, vì data là mảng trực tiếp
          setCartItems(data.items || []);  // Gán trực tiếp dữ liệu vào state
        } catch (error) {
          console.error('Lỗi khi lấy giỏ hàng:', error);
        }
      };
      

    if (user.id) {
      fetchCart(); // Gọi API lấy giỏ hàng nếu có userId
    }
  }, [user.id]);

  console.log('item',cartItems);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${user.id}`);
      const data = await response.json();
      console.log('Dữ liệu giỏ hàng nhận được:', data);
  
      // Không cần kiểm tra data.items, vì data là mảng trực tiếp
      setCartItems(data.items || []);  // Gán trực tiếp dữ liệu vào state
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };
  // const handleQuantityChange = async (productId, newQuantity) => {
  //   try {
  //     const itemToUpdate = cartItems.find(item => item.product._id === productId);
  //     if (!itemToUpdate || itemToUpdate.quantity === newQuantity) return;
  
  //     const { product, color, size } = itemToUpdate;
  
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/update`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         productId: product._id,
  //         color,
  //         size,
  //         quantity: newQuantity,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Lỗi ${response.status}`);
  //     }
  
  //     // 🌟 Fetch lại giỏ hàng ngay sau khi cập nhật
  //     fetchCart(); 

  //   } catch (error) {
  //     console.error('Lỗi khi cập nhật giỏ hàng:', error.message);
  //   }
  // };
  // const handleDeleteItem = async (productId) => {
  //   try {
  //     const itemToDelete = cartItems.find(item => item.product._id === productId);
  //     if (!itemToDelete) return;
  
  //     const { product, color, size } = itemToDelete;
  
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/delete`, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         productId: product._id,
  //         color,
  //         size,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Lỗi ${response.status}`);
  //     }
  
  //     // 🌟 Fetch lại giỏ hàng ngay sau khi xóa
  //     fetchCart();

  //   } catch (error) {
  //     console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error.message);
  //   }
  // };
  
  const handleQuantityChange = async (productId, color, size, newQuantity) => {
    try {
      // Xác định đúng sản phẩm cần cập nhật
      const itemToUpdate = cartItems.find(item => 
        item.product._id === productId && item.color === color && item.size === size
      );
      
      if (!itemToUpdate || itemToUpdate.quantity === newQuantity) return;
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId,
          color,
          size,
          quantity: newQuantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi ${response.status}`);
      }
  
      fetchCart(); // Cập nhật lại giỏ hàng
    } catch (error) {
      console.error('Lỗi khi cập nhật giỏ hàng:', error.message);
    }
  };
  const handleDeleteItem = async (productId, color, size) => {
    try {
      // Xác định đúng sản phẩm cần xóa
      const itemToDelete = cartItems.find(item => 
        item.product._id === productId && item.color === color && item.size === size
      );
  
      if (!itemToDelete) return;
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId,
          color,
          size,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi ${response.status}`);
      }
  
      fetchCart(); // Cập nhật lại giỏ hàng
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error.message);
    }
  };
  



  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price || 0;  // Đảm bảo giá là số hợp lệ
    return acc + (itemPrice * item.quantity);
  }, 0);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td>
                    <div className="product">
                      <img src={`http://localhost:5000${item.product.image}`} alt={item.product.name} />
                      <div className="product-info">
                        <p>{item.product.name}</p>
                        <p>MÀU SẮC: {item.color}</p>
                        <p>KÍCH THƯỚC: {item.size}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.product.price.toLocaleString('vi-VN')} ₫</td>
                  <td>
                    <div className="quantity">
                    <button onClick={() => handleQuantityChange(item.product._id, item.color, item.size, Math.max(1, item.quantity - 1))}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.product._id, item.color, item.size, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>{(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫ 
                  <button className="delete" onClick={() => handleDeleteItem(item.product._id, item.color, item.size)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="continue-shopping">
            - TIẾP TỤC XEM SẢN PHẨM
          </button>
        </div>

        <div className="cart-summary">
          <div className="summary-title">
            
          </div>

          <div className="total">
            <span>Tổng đơn</span>
            <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
          </div>

          <button className="checkout-button" onClick={() => navigate("/order")}>
            TIẾN HÀNH THANH TOÁN
          </button>

          <div className="freeship-message">
            CHÚC MỪNG BẠN ĐÃ ĐƯỢC FREESHIP CHO ĐƠN HÀNG NÀY
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;



