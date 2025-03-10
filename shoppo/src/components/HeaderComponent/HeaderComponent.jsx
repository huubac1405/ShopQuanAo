import React, { useState, useEffect, useRef } from "react";
import { Col } from "antd";
import { WrapperHeader, WrapperHeaderAcc, WrapperTextHeader } from "./style";
import { CaretDownOutlined, UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/userSlice";
import styled from "styled-components";

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  width: 200px;
  text-align: left;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: blue;
  }
`;

const LogoutButton = styled.div`
  color: red;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  padding: 8px 0;
  &:hover {
    background: #f8d7da;
  }
`;

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Tạo ref để theo dõi menu

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    dispatch(resetUser()); // Reset Redux state
    setShowMenu(false);
    navigate("/");
  };

  // Xử lý sự kiện click ra ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader 
            onClick={() => navigate("/")} 
            style={{ cursor: "pointer" }}
          >
            ShopPhuongOanh
          </WrapperTextHeader>

        </Col>
        <Col span={12}>
          <ButtonInputSearch size="large" placeholder="input search text" />
        </Col>
        <Col span={6} style={{ display: "flex", gap: "20px", paddingLeft: "100px", alignItems: "center" }}>
          <WrapperHeaderAcc>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user?.name ? (
              <div ref={menuRef} style={{ position: "relative" }}>
                <div onClick={() => setShowMenu(!showMenu)} style={{ cursor: "pointer" }}>
                  <p>Xin chào, {user.name}!</p>
                  <CaretDownOutlined />
                </div>
                {showMenu && (
                  <DropdownMenu>
                    <MenuItem onClick={() => navigate("/profile")}>Thông tin tài khoản</MenuItem>
                    {user?.isAdmin && (<MenuItem onClick={() => navigate("/admin")}>Quản trị hệ thống</MenuItem>)}
                    {!user?.isAdmin && (<MenuItem onClick={() => navigate("/myorder")}>Đơn hàng của tôi</MenuItem>)}
                    <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
                  </DropdownMenu>
                )}
              </div>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <span style={{ fontSize: "12px" }}>Đăng nhập/Đăng kí</span>
                <div>
                  <span style={{ fontSize: "12px" }}>Tài khoản</span>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAcc>
          <WrapperHeaderAcc>
          <ShoppingCartOutlined 
            style={{ fontSize: "30px", cursor: "pointer" }} 
            onClick={() => navigate("/cart")}
          />
          <span 
            style={{ fontSize: "12px", cursor: "pointer" }} 
            onClick={() => navigate("/cart")}
          >
            Giỏ hàng
          </span>

          </WrapperHeaderAcc>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
