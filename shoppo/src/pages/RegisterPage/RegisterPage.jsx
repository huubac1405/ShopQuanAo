import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [comfirmPass, setComfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log("Dữ liệu nhập:", { name, email, pass, comfirmPass });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (pass !== comfirmPass) {
      setError("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          name,
          email,
          pass,
          comfirmPass
        }
      );

      if (response.data?.message) {
        setSuccess("Đăng ký thành công!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi kết nối server!");
    }
    setLoading(false);
  };
  

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Mật khẩu"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <input
            type="password"
            name="comfirmPass"
            placeholder="Xác nhận mật khẩu"
            value={comfirmPass}
            onChange={(e) => setComfirmPass(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
