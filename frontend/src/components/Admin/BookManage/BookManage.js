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
  Form
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
  const [form] = Form.useForm()

  const handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      setPreviewImgURL(objUrl);
      setImage(base64);
    }
    event.target.value = null;
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await getAllBookService();
        setBooks(res.books);
      } catch (err) { }
    };
    getBooks();
  }, [isRender]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getAllCategoryService();
        setCategories(res.cats);
      } catch (err) { }
    };
    getCategories();
  }, [isRender]);

  useEffect(() => {
    form.setFieldsValue({ name: name, author: author, categoryId: viewCategoryId, amount: amount, image: image })
  }, [form, name, author, categoryId, amount, image])

  const showModalAdd = () => {
    setFormName("add");
    setName("");
    setAuthor("");
    setCategoryId(null);
    setImage("");
    setAmount(1);
    setPreviewImgURL("");
    setViewCategoryId("");
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
    setImage(record.image);
    setFormName("edit");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (formName === "add") {
      const data = await createBookService({
        name: name,
        author: author,
        categoryId: Number(categoryId),
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
        categoryId: Number(categoryId),
        amount: amount,
        image: image,
      });
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    setIsRender(!isRender);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
    categories.map((index) => {
      if (index.id === Number(value)) {
        setViewCategoryId(index.name);
      }
    });
  };

  const handleDelete = async (record) => {
    const data = await deleteBookService(record.id);
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsRender(!isRender);;
  };

  const onChangeInput = (value) => {
    setAmount(value);
  };

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Quản lý sách</Typography.Title>
      <Button type="primary" onClick={showModalAdd}>
        Thêm mới
      </Button>
      <Modal
        title={formName === "add" ? "Thêm sách" : "Chỉnh sửa sách"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onFinish={handleOk} form={form}
          initialValues={{ name: name, author: author, categoryId: categoryId, amount: amount, image: image }} >
          <Form.Item name="name" label="Tên sách" rules={[
            {
              required: true,
              message: "Nhập tên sách"
            },
          ]}>
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[
            {
              required: true,
              message: "Nhập tên tác giả"
            },
          ]}>
            <Input onChange={(e) => setAuthor(e.target.value)} />
          </Form.Item>
          <Form.Item name="categoryId" label="Thể loại" rules={[
            {
              required: true,
              message: "Chọn thể loại"
            },
          ]}>
            <Select
              style={{
                width: "100%",
              }}
              value={viewCategoryId}
              onChange={(e) => handleCategoryChange(e)}
            >
              {categories.map((category) => (
                <Option key={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Số lượng">
            <InputNumber
              min={1}
              max={100}
              onChange={onChangeInput}
            />
          </Form.Item>
          <Form.Item name="image">
            <div style={{ marginLeft: "50px" }}>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => handleOnChangeImage(event)}
              />
              <label className="lable-upload" htmlFor="previewImg">
                Tải ảnh <i className="fas fa-upload"></i>
              </label>
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
          </Form.Item>
          <Form.Item style={{ width: "100%", textAlign: "right" }}>
            <Button type="primary" htmlType="submit">{formName === "add" ? "Thêm sách" : "Chỉnh sửa sách"}</Button>
          </Form.Item>
        </Form>
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
