import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getAllHistoryService } from "../../../service/historyService";
import { UserAuth } from "../../../Context/AuthProvider";
import axiosJWT from "../../../axiosJWT";

const UserManage = () => {
  const columns = [
    {
      title: "Tên nguời mượn",
      dataIndex: "userId",
    },
    {
      title: "Tên sách",
      dataIndex: "bookId",
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrowedDate",
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <Button type="primary" danger>
              Xoá
            </Button>
          </a>
        </Space>
      ),
    },
  ];
  const [histories, setHistories] = useState([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [borrowedDate, setBorrowedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("");
  const tableColumns = columns.map((item) => ({ ...item }));
  const [isRender, setIsRender] = useState(false);
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } = UserAuth();
  const axios = axiosJWT(accessToken, refreshToken, setAccessToken, setRefreshToken);

  useEffect(() => {
    const getHistories = async () => {
      try {
        const res = await getAllHistoryService(accessToken, axios);
        setHistories(res.his);
        return;
      } catch (err) { }
    };
    getHistories();
  }, [isRender]);

  return (
    <>
      <Typography.Title>Lịch sử</Typography.Title>
      <Table columns={tableColumns} dataSource={histories} rowKey="Id" />
    </>
  );
};

export default UserManage;
