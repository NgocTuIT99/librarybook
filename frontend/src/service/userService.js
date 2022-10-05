import axios from "../axios";

const handleLoginService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUserService = () => {
  return axios.get(`/api/get-all-user`);
};

const createUserService = (data) => {
  return axios.post("/api/create-user", data);
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};

export {
  handleLoginService,
  getAllUserService,
  createUserService,
  editUserService,
  deleteUserService,
};
