
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './OrderPage.module.css';

function OrderPage() {
  const location = useLocation();
  const { directProduct } = location.state || {}; // Lấy sản phẩm từ "Mua ngay"
  const user = useSelector((state) => state.user);
  
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    console.log("directProduct:", directProduct);  // 🛠 Kiểm tra dữ liệu được truyền qua
    console.log("User ID:", user.id);
  
    if (!user.id) return;
  
    if (!directProduct) {
      fetch(`${import.meta.env.VITE_API_URL}/cart/${user.id}`)
        .then(res => res.json())
        .then(data => setProducts(data.items))
        .catch(err => console.error("Lỗi khi lấy giỏ hàng:", err));
    } else {
      setProducts([directProduct]);  // ✅ Gán sản phẩm mua ngay vào danh sách
    }
  }, [user.id, directProduct]);
  

  const totalAmount = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (products.length === 0) {
      alert("Không có sản phẩm để đặt hàng!");
      return;
    }
  
    console.log("🔍 Danh sách sản phẩm:", products);
  
    const orderData = {
      userId: user.id,
      items: products.map(item => {
        if (!item.product || !item.product._id) {
          console.error("❌ Lỗi: sản phẩm không có ID!", item);
          return null;
        }
        return {
          productId: item.product._id, // 🔥 Đổi từ id -> _id
          color: item.color || "",
          size: item.size || "",
          quantity: item.quantity || 1
        };
      }).filter(item => item !== null),
      total: totalAmount,
      shippingInfo: { name, phone, province, district, ward, address },
      paymentMethod
    };
  
    console.log("🛒 Order Data gửi đi:", orderData);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Đặt hàng thành công!');
      } else {
        alert(result.message || "Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (error) {
      console.error('❌ Lỗi đặt hàng:', error);
    }
  };
  
  
  

  return (
    <div className={styles.orderPage}>
      <div className={styles.productList}>
        <h2>{products.length} sản phẩm</h2>
        {products.map((product, index) => (
          <div key={index} className={styles.productItem}>
            <img src={`http://localhost:5000${product.product.image}`} alt={product.product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
              <h3>{product.product.name}</h3>
              <p>Màu sắc: {product.color}</p>
              <p>Kích thước: {product.size}</p>
              <p>Số lượng: {product.quantity}</p>
              <p className={styles.price}>
                Giá: {product.product.price.toLocaleString()}₫
              </p>
              <p className={styles.price}>
                Thành tiền: {(product.product.price * product.quantity).toLocaleString()}₫
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.shippingInfo}>
        <h2>THÔNG TIN GIAO HÀNG</h2>
        <div className={styles.formGroup}>
          <label>Họ và tên</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Số điện thoại</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Địa chỉ</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Tỉnh/Thành phố</label>
          <input type="text" value={province} onChange={e => setProvince(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Quận/Huyện</label>
          <input type="text" value={district} onChange={e => setDistrict(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Phường/Xã</label>
          <input type="text" value={ward} onChange={e => setWard(e.target.value)} />
        </div>
      </div>

      <div className={styles.orderSummaryRight}>
        <div className={styles.summarySection}>
          <h2>TẠM TÍNH</h2>
          <p>Tổng tiền: {totalAmount.toLocaleString()}₫</p>
        </div>

        <div className={styles.paymentSection}>
          <h2>PHƯƠNG THỨC THANH TOÁN</h2>
          <label>
            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Thanh toán khi nhận hàng
          </label>
          <label>
            <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} /> Chuyển khoản ngân hàng
          </label>
        </div>

        <button className={styles.placeOrder} onClick={handlePlaceOrder}>ĐẶT HÀNG ({totalAmount.toLocaleString()}₫)</button>
      </div>
    </div>
  );
}

export default OrderPage;







