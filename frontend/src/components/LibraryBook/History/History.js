import { Space, Table, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../../../Context/AuthProvider";
import {
  getAllHistoryByUserService,
  returnBookService,
} from "../../../service/historyService";
import { ToastContainer, toast } from "react-toastify";

const History = () => {
  const columns = [
    {
      title: "Tên sách",
      dataIndex: ["bookData", "name"],
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
      render: (text, record) => (
        <Space size="middle">
          {record.status === "Đang mượn" ? (
            <a>
              <Button type="primary" onClick={() => handleReturn(record)}>
                Trả sách
              </Button>
            </a>
          ) : (
            <></>
          )}
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
  const { setSelectedForm, user } = UserAuth();
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    const getHistories = async () => {
      let id = user.id ? user.id : user.uid.replace(/[^0-9]/g, "");
      try {
        const res = await getAllHistoryByUserService(Number(id));
        setHistories(res.his);
      } catch (err) { }
    };
    return () => {
      getHistories();
    };
  }, [loadings]);

  const handleReturn = async (record) => {
    let data = [];
    if (user.id) {
      data = await returnBookService({
        userId: user.id,
        bookId: record.bookId,
      });
    } else {
      data = await returnBookService({
        userId: Number(user.uid.replace(/[^0-9]/g, "")),
        bookId: record.bookId,
      });
    }
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLoadings(!loadings);
  };

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Lịch sử</Typography.Title>
      <Button type="primary" onClick={() => setSelectedForm("0")}>
        Trang chủ
      </Button>
      <Table
        columns={tableColumns}
        dataSource={histories}
        pagination={false}
        style={{ border: "1px solid grey", margin: "3px" }}
      />
      <ToastContainer />
    </div>
  );
};

export default History;
