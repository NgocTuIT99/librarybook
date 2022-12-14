import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../Context/AuthProvider";
import { Row, Col, Image, Modal, Typography } from "antd";
import {
  getAllBookByCategoryService,
} from "../../../service/bookService";
import { borrowBookService } from "../../../service/historyService";
import { ToastContainer, toast } from "react-toastify";
import axiosJWT from "../../../axiosJWT";

export default function ProductList({ selectedCategory }) {
  const { user, accessToken, refreshToken, setAccessToken, setRefreshToken } = UserAuth();
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [book, setBook] = useState({});
  const axios = axiosJWT(accessToken, refreshToken, setAccessToken, setRefreshToken);

  useEffect(() => {
    const getBooks = async () => {
      try {
        let res = await getAllBookByCategoryService(Number(selectedCategory), accessToken, axios);
        setBooks(res.books);
      } catch (err) { }
    };
    getBooks();
  }, [selectedCategory, isModalOpen]);

  const showModal = (book) => {
    setBook(book);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let data = [];
    if (user.id) {
      data = await borrowBookService({
        userId: Number(user.id),
        bookId: book.id,
      }, accessToken, axios);
    } else {
      data = await borrowBookService({
        userId: Number(user.uid.replace(/[^0-9]/g, "")),
        bookId: book.id,
      }, accessToken, axios);
    }
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ border: "1px solid grey", margin: "5px" }}>
      <Row style={{ justifyContent: "center" }}>
        {books ? (
          books.map((book) => (
            <Col
              span={4}
              style={{
                border: "1px solid grey",
                margin: "5px 35px 5px 35px",
                height: "250px",
                textAlign: "center",
                background: "grey",
              }}
              onClick={() => showModal(book)}
            >
              <Image
                src={book.image}
                preview={false}
                width={190}
                height={195}
              />
              <div
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  background: "#3f0e40",
                }}
              >
                <div style={{ color: "white" }}>{book.name}</div>
                <div style={{ color: "white" }}>{book.author}</div>
              </div>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <Modal
        title="X??c nh???n"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text>B???n mu???n m?????n cu???n s??ch n??y??</Typography.Text>
      </Modal>
      <ToastContainer />
    </div>
  );
}
