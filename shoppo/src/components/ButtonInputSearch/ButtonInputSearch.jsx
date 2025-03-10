import { Input, Button } from "antd";
import React from "react";

const ButtonInputSearch = ({ size, placeholder }) => {
  return (
    <Input.Search
      size={size}
      placeholder={placeholder}
      enterButton={
        <Button style={{ backgroundColor: "#FFC0CB", borderColor: "#FFC0CB", color: "black" }}>
          Tìm kiếm
        </Button>
      }
      allowClear
    />
  );
};

export default ButtonInputSearch;
