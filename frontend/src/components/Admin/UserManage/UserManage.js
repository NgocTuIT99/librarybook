import { Space, Table, Typography, Button, Modal, Input, Select, Form } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllUserService,
  createUserService,
  editUserService,
  deleteUserService,
} from "../../../service/userService";
import { UserAuth } from "../../../Context/AuthProvider";
import axiosJWT from "../../../axiosJWT";

const { Option } = Select;

const UserManage = () => {
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Vai trò",
      dataIndex: "providerId",
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
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [providerId, setProviderId] = useState("admin");
  const tableColumns = columns.map((item) => ({ ...item }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [isRender, setIsRender] = useState(false);
  const [form] = Form.useForm()
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } = UserAuth();
  const axios = axiosJWT(accessToken, refreshToken, setAccessToken, setRefreshToken);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUserService(accessToken, axios);
        setUsers(res.users);
      } catch (err) { }
    };
    getUsers();
  }, [isRender]);

  useEffect(() => {
    form.setFieldsValue({ email: email, password: password, fullName: fullName, address: address, phoneNumber: phoneNumber, providerId: providerId })
  }, [form, email, password, fullName, address, phoneNumber, providerId])

  const showModalAdd = () => {
    clearState();
    setFormName("add");
    setIsModalOpen(true);
  };

  const showModalEdit = (record) => {
    setUserId(record.id);
    setEmail(record.email);
    setPassword(record.password);
    setFullName(record.fullName);
    setAddress(record.address);
    setPhoneNumber(record.phoneNumber);
    setProviderId(record.providerId);
    setFormName("edit");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (formName === "add") {
      const data = await createUserService({
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        providerId: providerId,
      }, accessToken, axios);
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    if (formName === "edit") {
      const data = await editUserService({
        id: userId,
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        providerId: providerId,
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

  const handleCancel = () => {
    clearState();
    setIsModalOpen(false);
  };

  const handleDelete = async (record) => {
    const data = await deleteUserService(record.id, accessToken, axios);
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsRender(!isRender);
    clearState();
  };

  const clearState = () => {
    setUserId("");
    setEmail("");
    setPassword("");
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setProviderId("admin");
  };

  const handleChangeProviderId = (value) => {
    setProviderId(value);
  }

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Quản lý người dùng</Typography.Title>
      <Button type="primary" onClick={showModalAdd}>
        Thêm mới
      </Button>
      <Modal
        title={formName === "add" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onFinish={handleOk} form={form}
          initialValues={{ email: email, password: password, fullName: fullName, address: address, phoneNumber: phoneNumber, providerId: providerId }} >
          <Form.Item name="email" label="Email" rules={[
            {
              required: true,
              message: "Nhập email"
            },
            { type: "email", message: "Email không hợp lệ" }
          ]}>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          {formName === "add" ?
            <Form.Item name="password" label="Mật khẩu" rules={[
              {
                required: true,
                message: "Nhập mật khẩu"
              },
            ]}>
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item> : null}
          <Form.Item name="fullName" label="Tên người dùng" rules={[
            {
              required: true,
              message: "Nhập tên người dùng"
            },
          ]}>
            <Input onChange={(e) => setFullName(e.target.value)} />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại" rules={[
            {
              required: true,
              message: "Nhập số điện thoại",
              pattern: new RegExp(/^[0-9]+$/)
            },
          ]}>
            <Input onChange={(e) => setPhoneNumber(e.target.value)} />
          </Form.Item>
          <Form.Item name="providerId" label="Vai trò">
            <Select
              value={providerId}
              style={{
                width: 120,
              }}
              onChange={handleChangeProviderId}
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ width: "100%", textAlign: "right" }}>
            <Button type="primary" htmlType="submit">{formName === "add" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowKey="Id"
        columns={tableColumns}
        dataSource={users}
        pagination={false}
        style={{ border: "1px solid grey", margin: "3px" }}
      />
      <ToastContainer />
    </div>
  );
};

export default UserManage;
