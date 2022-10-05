import React from "react";
import Sidebar from "./Sidebar";
import LibraryBook from "./LibraryBook";
import { Row, Col } from "antd";

export default function UI() {
  return (
    <div>
      <Row>
        <Col span={4}>
          <Sidebar />
        </Col>
        <Col span={20}>
          <LibraryBook />
        </Col>
      </Row>
    </div>
  );
}
