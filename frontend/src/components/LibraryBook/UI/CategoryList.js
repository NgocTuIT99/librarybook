import React, { useEffect, useState } from "react";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { getAllCategoryService } from "../../../service/categoryService";
import { UserAuth } from "../../../Context/AuthProvider";
import axiosJWT from "../../../axiosJWT";

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

export default function CategoryList({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } = UserAuth();
  const axios = axiosJWT(accessToken, refreshToken, setAccessToken, setRefreshToken);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getAllCategoryService(accessToken, axios);
        setCategories(res.cats);
      } catch (err) { }
    };
    getCategories();
  }, [categories.length]);

  const handleClick = (value) => {
    setSelectedCategory(value);
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
    </Collapse >
  );
}
