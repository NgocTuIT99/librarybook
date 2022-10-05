import React from "react";
import { auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../Context/AuthProvider";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <WrapperStyled>
      <div>
        <Avatar src={user.photoURL}>
          {user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">
          {user.displayName ? user.displayName : user.fullName}
        </Typography.Text>
      </div>
      <Button
        ghost
        onClick={handleLogout}
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}
