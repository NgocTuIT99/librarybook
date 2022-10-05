import React from "react";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { UserAuth } from "../../../Context/AuthProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function Manage() {
  const { setSelectedForm } = UserAuth();
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách quản lý" key="1">
        <LinkStyled onClick={() => setSelectedForm("1")}>
          Quản lý người dùng
        </LinkStyled>
        <LinkStyled onClick={() => setSelectedForm("2")}>
          Quản lý sách
        </LinkStyled>
        <LinkStyled onClick={() => setSelectedForm("3")}>
          Quản lý thể loại
        </LinkStyled>
        <LinkStyled onClick={() => setSelectedForm("4")}>Lịch sử</LinkStyled>
      </PanelStyled>
    </Collapse>
  );
}
