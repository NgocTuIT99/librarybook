import React from "react";
import UserInfo from "./UserInfo";
import CategoryList from "./CategoryList";
import { Row, Col } from "antd";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: #3f0e40;
  color: white;
  height: 100vh;
`;

export default function Sidebar({ setSelectedCategory }) {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <CategoryList setSelectedCategory={setSelectedCategory} />
        </Col>
      </Row>
    </SidebarStyled>
  );
}
