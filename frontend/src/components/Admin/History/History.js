import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getAllHistoryService } from "../../../service/historyService";

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

  useEffect(() => {
    const getHistories = async () => {
      try {
        const res = await getAllHistoryService();
        setHistories(res.his);
        console.log(res.his);
        return;
      } catch (err) {}
    };
    return () => {
      getHistories();
    };
  }, [isRender]);

  return (
    <>
      <Typography.Title>Lịch sử</Typography.Title>
      <Table columns={tableColumns} dataSource={histories} rowKey="Id" />
    </>
  );
};

export default UserManage;
