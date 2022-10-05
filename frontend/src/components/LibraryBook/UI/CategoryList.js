import React, { useEffect, useState } from "react";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { getAllCategoryService } from "../../../service/categoryService";
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

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = UserAuth();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getAllCategoryService();
        setCategories(res.cats);
      } catch (err) {}
    };
    return () => {
      getCategories();
    };
  }, [selectedCategory]);

  const handleClick = (value) => {
    setSelectedCategory(value.toString());
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các thể loại" key="1">
        <LinkStyled onClick={() => handleClick(0)}>Tất cả</LinkStyled>
        {categories ? (
          categories.map((item) => (
            <LinkStyled
              item={item}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
            </LinkStyled>
          ))
        ) : (
          <></>
        )}
      </PanelStyled>
    </Collapse>
  );
}
