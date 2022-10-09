import { Space, Table, Typography, Button, Modal, Input } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllCategoryService,
  createCategoryService,
  editCategoryService,
  deleteCategoryService,
} from "../../../service/categoryService";

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
    setCategoryId(record.id);
    setName(record.name);
    setDescription(record.description);
    setFormName("edit");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const checkCategory = checkInput()
    if (checkCategory === false) {
      toast.error("Bạn chưa nhập tên thể loại");
      return;
    }
    if (formName === "add") {
      const data = await createCategoryService({
        name: name,
        description: description,
      });
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

  const handleDelete = async (record) => {
    const data = await deleteCategoryService(record.id);
    if (data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsRender(!isRender);
    clearState();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const clearState = () => {
    setName("");
    setDescription("");
  };

  const checkInput = () => {
    if (name === "") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div style={{ margin: "5px" }}>
      <Typography.Title>Quản lý thể loại</Typography.Title>
      <Button type="primary" onClick={showModalAdd}>
        Thêm mới
      </Button>
      <Modal
        title={formName === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text>Tên thể loại</Typography.Text>
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <br />
        <br />
        <Typography.Text>Mô tả</Typography.Text>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
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
