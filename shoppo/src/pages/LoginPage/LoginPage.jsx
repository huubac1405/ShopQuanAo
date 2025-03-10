import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { jwtDecode } from "jwt-decode";
import { getDetailsUser } from '../../services/UserService';
import { useDispatch} from "react-redux"
import { updateUser } from "../../redux/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("API URL:", import.meta.env.VITE_API_URL); // Kiểm tra URL API
  console.log("Email nhập vào:", email);
  console.log("Password nhập vào:", pass);
  
  const handleGetDetailsUser = async (id, token) => {
    console.log("Gọi API lấy thông tin user...");
    const res = await getDetailsUser(id, token);
    console.log("Kết quả API:", res.data);

    if (res.data) {
        dispatch(updateUser({ ...res.data, access_token: token }));
        console.log("Đã cập nhật Redux:", res.data);
    } else {
        console.error("Không nhận được dữ liệu user từ API!");
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !pass.trim()) {
      setError("Email và mật khẩu không được để trống!");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email, pass }
      );

      
      console.log("API Response:", response.data);
      const { access_token } = response.data;
      console.log("Token nhận được:", access_token); // Log token để kiểm tra
      if (access_token) {
        localStorage.setItem("token", access_token);
        navigate("/");

        try {
          const decoded = jwtDecode(access_token);
          console.log("Decoded Token:", decoded);
          if(decoded?.id){
            handleGetDetailsUser(decoded?.id,access_token)
          }
        } catch (decodeError) {
          console.error("Lỗi giải mã token:", decodeError);
          setError("Token không hợp lệ!");
        }
      } else {
        setError("Đăng nhập thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Mật khẩu</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button type="submit" className="login-btn">
          Đăng Nhập
        </button>

        <div className="links">
          <a href="#">Quên mật khẩu?</a>
          <a href="http://localhost:5173/register" >Đăng ký tài khoản</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;



