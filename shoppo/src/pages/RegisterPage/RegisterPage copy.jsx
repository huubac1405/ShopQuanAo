import React, { useState } from "react";
import "./RegisterPage.css"; // Import file CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pass !== formData.confirmPass) {
      alert("Mật khẩu không khớp!");
      return;
    }
    alert("Đăng ký thành công!");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Đăng ký</button>
        </form>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
