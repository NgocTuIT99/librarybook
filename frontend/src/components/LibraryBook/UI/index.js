import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LibraryBook from "./LibraryBook";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

export default function UI({ checkLogin }) {
  let navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  React.useEffect(() => {
    if (checkLogin === false) {
      return navigate("/login");
    }
  }, [checkLogin]);

  return (
    <div>
      <Row>
        <Col span={4}>
          <Sidebar setSelectedCategory={setSelectedCategory} />
        </Col>
        <Col span={20}>
          <LibraryBook selectedCategory={selectedCategory} />
        </Col>
      </Row>
    </div>
  );
}
