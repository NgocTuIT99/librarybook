import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { Row, Col } from "antd";

export default function Admin() {
  return (
    <div>
      <Row>
        <Col span={4}>
          <Sidebar />
        </Col>
        <Col span={20}>
          <Home />
        </Col>
      </Row>
    </div>
  );
}
