import { Space, Table, Typography, Button, Modal, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllUserService,
  createUserService,
  editUserService,
  deleteUserService,
} from "../../../service/userService";
import validator from 'validator';

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
  const [providerId, setProviderId] = useState("");
  const tableColumns = columns.map((item) => ({ ...item }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUserService();
        setUsers(res.users);
      } catch (err) { }
    };
    return () => {
      getUsers();
    };
  }, [isRender]);

  const showModalAdd = () => {
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
      const checkInput = validateInputAdd();
      if (checkInput === false) {
        toast.error("Bạn cần nhập chính xác email, password và tên người dùng")
        return;
      }
      const data = await createUserService({
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        providerId: providerId,
      });
      if (data.errCode === 0) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    if (formName === "edit") {
      const checkInput = validateInputEdit();
      if (checkInput === false) {
        toast.error("Bạn cần nhập chính xác email và tên người dùng")
        return;
      }
      const data = await editUserService({
        id: userId,
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        providerId: providerId,
      });
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
    const data = await deleteUserService(record.id);
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

  const validateInputAdd = () => {
    if (validator.isEmail(email) && password !== "" && fullName !== "") {
      return true;
    } else {
      return false;
    }
  }

  const validateInputEdit = () => {
    if (validator.isEmail(email) && fullName !== "") {
      return true;
    } else {
      return false;
    }
  }

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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text>Email</Typography.Text>
        <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <br />
        {formName === "add" ? (
          <>
            <Typography.Text>Mật khẩu</Typography.Text>
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <br />
          </>
        ) : (
          <></>
        )}
        <Typography.Text>Họ và tên</Typography.Text>
        <Input onChange={(e) => setFullName(e.target.value)} value={fullName} />
        <br />
        <br />
        <Typography.Text>Địa chỉ</Typography.Text>
        <Input onChange={(e) => setAddress(e.target.value)} value={address} />
        <br />
        <br />
        <Typography.Text>Số điện thoại</Typography.Text>
        <Input
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <br />
        <br />
        <Typography.Text style={{ marginRight: "10px" }}>Vai trò</Typography.Text>
        {/* <Input
          value={providerId}
          defaultValue="admin"
          onChange={(e) => setProviderId(e.target.value)}
        /> */}
        <Select
          defaultValue="admin"
          style={{
            width: 120,
          }}
          onChange={handleChangeProviderId}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
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
