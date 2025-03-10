// import React from "react";
import styled from "styled-components";
import '@fortawesome/fontawesome-free/css/all.min.css';

const FooterWrapper = styled.footer`
  background: #D3D3D3;
  color: black;
  padding: 20px 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 250px;
  margin: 10px;
`;

const Title = styled.h4`
  font-size: 18px;
  margin-bottom: 15px;
  color: black;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 8px 0;
  font-size: 14px;
  color: black;

  &:hover {
    cursor: pointer;
  }
`;

const SocialIcons = styled.div`
  margin-top: 10px;
  font-size: 18px;

  a {
    color: black;
    margin: 0 10px;
    transition: 0.3s;

    &:hover {
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 10px;
  border-top: 1px solid #444;
  font-size: 14px;
  color: black;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Column>
          <Title>Về Chúng Tôi</Title>
          <List>
            <ListItem>Giới thiệu</ListItem>
            <ListItem>Liên hệ</ListItem>
            <ListItem>Chính sách bảo mật</ListItem>
            <ListItem>Điều khoản dịch vụ</ListItem>
          </List>
        </Column>

        <Column>
          <Title>Hỗ Trợ Khách Hàng</Title>
          <List>
            <ListItem>Hướng dẫn mua hàng</ListItem>
            <ListItem>Chính sách đổi trả</ListItem>
            <ListItem>Chăm sóc khách hàng</ListItem>
            <ListItem>Câu hỏi thường gặp</ListItem>
          </List>
        </Column>

        <Column>
          <Title>Kết Nối Với Chúng Tôi</Title>
          <SocialIcons>
            <a href="https://www.facebook.com/profile.php?id=61551310937580"><i className="fab fa-facebook"></i></a>
            <a href="https://www.tiktok.com/@oanh.phng.qccc"><i className="fab fa-tiktok"></i></a>
          </SocialIcons>
        </Column>
      </Container>

      <FooterBottom>
        &copy; {new Date().getFullYear()} ShopPhuongOanh. Tất cả quyền được bảo lưu.
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
