import {
  Space,
  Table,
  Typography,
  Button,
  Modal,
  InputNumber,
  Input,
  Select,
  Image,
} from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommonUtils from "../../../CommonUtils";
import {
  getAllBookService,
  createBookService,
  editBookService,
  deleteBookService,
} from "../../../service/bookService";
import { ToastContainer, toast } from "react-toastify";
import { getAllCategoryService } from "../../../service/categoryService";

const BoxDiv = styled.div`
  display: flex;
`;

const { Option } = Select;

const UserManage = () => {
  const columns = [
    {
      title: "Tên sách",
      dataIndex: "name",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Thể loại",
      dataIndex: ["categoryData", "name"],
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModalEdit(record)}>
            Sửa
          </Button>
          <a>
            <Button type="primary" onClick={() => handleDelete(record)} danger>
              Xoá
            </Button>
          </a>
        </Space>
      ),
    },
  ];
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [viewCategoryId, setViewCategoryId] = useState("");
  const [amount, setAmount] = useState(1);
  const [image, setImage] = useState("");
  const tableColumns = columns.map((item) => ({ ...item }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [isRender, setIsRender] = useState(false);
  const [previewImgURL, setPreviewImgURL] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      setPreviewImgURL(objUrl);
      setImage(base64);
    }
  };

  const openPreviewImage = () => {
    if (!previewImgURL) {
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await getAllBookService();
        setBooks(res.books);
      } catch (err) { }
    };
    return () => {
      getBooks();
    };
  }, [isRender]);

  useEffect(() => {
    setCategoryId(null);
  }, [isOpen]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getAllCategoryService();
        setCategories(res.cats);
      } catch (err) { }
    };
    return () => {
      getCategories();
    };
  }, [isRender]);

  const showModalAdd = () => {
    setFormName("add");
    setIsModalOpen(true);
  };

  const showModalEdit = (record) => {
    if (categories === []) {
      setCategoryId(null);
    }
    setBookId(record.id);
    setName(record.name);
    setAuthor(record.author);
    setCategoryId(record.categoryId);
    setViewCategoryId(record.categoryData.name);
    setAmount(record.amount);
    setPreviewImgURL(record.image);
    setFormName("edit");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const checkInputBook = checkInput();
    if (checkInputBook === false) {
      toast.error("Bạn chưa nhập đầy đủ thông tin sách");
      return;
    }
    if (formName === "add") {
      const data = await createBookService({
        name: name,
        author: author,
        categoryId: categoryId,
        amount: amount,
        image: image,
      });
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    if (formName === "edit") {
      const data = await editBookService({
        id: bookId,
        name: name,
        author: author,
        categoryId: categoryId,
        amount: amount,
        image: image,
      });
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    clearState();
    setIsRender(!isRender);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    clearState();
    setIsModalOpen(false);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  const handleDelete = async (record) => {
    const data = await deleteBookService(record.id);
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsRender(!isRender);
    clearState();
  };

  const clearState = () => {
    setName("");
    setAuthor("");
    setCategoryId(null);
    setImage("");
    setAmount(1);
    setPreviewImgURL("");
    setViewCategoryId("");
  };

  const onChangeInput = (value) => {
    setAmount(value);
  };

  const checkInput = () => {
    if (name === "" || author === "" || categoryId === 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Quản lý sách</Typography.Title>
      <Button type="primary" onClick={showModalAdd}>
        Thêm mới
      </Button>
      <Modal
        title={formName === "add" ? "Thêm sách" : "Chỉnh sửa sách"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text>Tên sách</Typography.Text>
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <br />
        <br />
        <Typography.Text>Tác giả</Typography.Text>
        <Input onChange={(e) => setAuthor(e.target.value)} value={author} />
        <br />
        <br />
        <BoxDiv>
          <div style={{ marginRight: "50px" }}>
            <Typography.Text>Thể loại </Typography.Text>
            <Select
              style={{
                width: 120,
              }}
              defaultValue={viewCategoryId}
              onChange={(e) => handleCategoryChange(e)}
            >
              {categories.map((category) => (
                <Option key={category.id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography.Text>Số lượng </Typography.Text>
            <InputNumber
              min={1}
              max={100}
              value={amount}
              onChange={onChangeInput}
            />
          </div>
        </BoxDiv>
        <div style={{ marginTop: "30px" }}>
          <input
            id="previewImg"
            type="file"
            hidden
            onClick={(event) => handleOnChangeImage(event)}
          />
          <label className="lable-upload" htmlFor="previewImg">
            Tải ảnh <i className="fas fa-upload"></i>
          </label>
          <div
            style={{ backgroundImage: `url(${previewImgURL})` }}
            onClick={openPreviewImage}
          ></div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Image
              width={200}
              src={previewImgURL}
              style={{
                border: "1px solid grey",
                marginTop: "5px",
                justifyContent: "center",
              }}
            />
          </div>
        </div>
      </Modal>
      <Table
        rowKey="Id"
        columns={tableColumns}
        dataSource={books}
        pagination={false}
        style={{ border: "1px solid grey", margin: "3px" }}
      />
      <ToastContainer />
    </div>
  );
};

export default UserManage;
