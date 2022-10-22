import { Space, Table, Typography, Button, Modal, Input, Form } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllCategoryService,
  createCategoryService,
  editCategoryService,
  deleteCategoryService,
} from "../../../service/categoryService";
import { UserAuth } from "../../../Context/AuthProvider";
import axiosJWT from "../../../axiosJWT";

const UserManage = () => {
  const columns = [
    {
      title: "Tên thể loại",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
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
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const tableColumns = columns.map((item) => ({ ...item }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [isRender, setIsRender] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm()
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
  }, [isRender]);

  useEffect(() => {
    form.setFieldsValue({ name: name, description: description })
  }, [form, name, description])


  const showModalAdd = () => {
    setFormName("add");
    setIsModalOpen(true);
  };

  const showModalEdit = (record) => {
    setCategoryId(record.id);
    setName(record.name);
    setDescription(record.description);
    setFormName("edit");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (formName === "add") {
      const data = await createCategoryService({
        name: name,
        description: description,
      }, accessToken, axios);
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    if (formName === "edit") {
      const data = await editCategoryService({
        id: categoryId,
        name: name,
        description: description,
      }, accessToken, axios);
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    setIsRender(!isRender);
    clearState();
    setIsModalOpen(false);
  };

  const handleDelete = async (record) => {
    const data = await deleteCategoryService(record.id, accessToken, axios);
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsRender(!isRender);
    clearState();
  };

  const handleCancel = () => {
    clearState();
    setIsModalOpen(false);
  };

  const clearState = () => {
    setName("");
    setDescription("");
  };

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Quản lý thể loại</Typography.Title>
      <Button type="primary" onClick={showModalAdd}>
        Thêm mới
      </Button>
      <Modal
        title={formName === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onFinish={handleOk} form={form}
          initialValues={{ name: name, description: description }} >
          <Form.Item name="name" label="Tên thể loại" rules={[
            {
              required: true,
              message: "Nhập thể loại"
            },
          ]}>
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item name="description" label="Mô tả thể loại">
            <TextArea onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>

          <Form.Item style={{ width: "100%", textAlign: "right" }}>
            <Button type="primary" htmlType="submit">{formName === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowKey="Id"
        columns={tableColumns}
        dataSource={categories}
        pagination={false}
        style={{ border: "1px solid grey", margin: "3px" }}
      />
      <ToastContainer />
    </div>
  );
};

export default UserManage;
