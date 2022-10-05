import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../Context/AuthProvider";
import { Button } from "antd";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const { setSelectedForm } = UserAuth();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>VI</Language>
          <SearchContainer>
            <Input placeholder="Tìm kiếm" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>THƯ VIỆN SÁCH</Logo>
        </Center>
        <Right>
          <Link onClick={() => setSelectedForm("1")}>
            <Button>Lịch sử</Button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
