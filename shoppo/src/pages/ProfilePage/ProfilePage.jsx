import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { updateUser } from "../../redux/userSlice";

const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const Label = styled.label`
  flex: 1;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#007bff" : "#dc3545")};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("User Redux:", user);

    // Đặt giá trị mặc định để tránh lỗi "controlled to uncontrolled"
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [message, setMessage] = useState("");

    // Cập nhật state khi user từ Redux thay đổi (nếu có)
    useEffect(() => {
        setName(user?.name || "");
        setPhone(user?.phone || "");
    }, [user]);

    
    const handleUpdate = async () => {
        try {
            const updatedData = { name, phone, email: user.email, pass: user.pass };
            
            // Cập nhật ngay vào state cục bộ để tránh bị reset
            dispatch(updateUser({ ...user, ...updatedData }));
    
            // Gọi API cập nhật
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update/${user.id}`, updatedData);
    
            // Sau khi API phản hồi, cập nhật lại Redux
            dispatch(updateUser({ ...response.data, access_token: user.access_token }));
            
            setMessage("Cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            setMessage("Cập nhật thất bại, vui lòng thử lại!");
        }
    };
    

    const handleBack = () => {
        navigate("/");
    };

    return (
        <ProfileContainer>
            <h2>Thông tin cá nhân</h2>
            {message && <p style={{ color: message.includes("thành công") ? "green" : "red" }}>{message}</p>}

            <FormGroup>
                <Label>Email:</Label>
                <Input type="text" value={user.email} disabled />
            </FormGroup>

            <FormGroup>
                <Label>Tên:</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormGroup>

            <div>
                <Button primary={true.toString()} onClick={handleUpdate}>Cập nhật</Button>
                <Button onClick={handleBack}>Trở về trang chủ</Button>
            </div>
        </ProfileContainer>
    );
};

export default ProfilePage;
