import axios from "../axios";

const getAllCategoryService = () => {
  return axios.get(`/api/get-all-category`);
};

const createCategoryService = (data) => {
  return axios.post("/api/create-category", data);
};

const editCategoryService = (data) => {
  return axios.put("/api/edit-category", data);
};

const deleteCategoryService = (id) => {
  return axios.delete("/api/delete-category", {
    data: {
      id: id,
    },
  });
};

export {
  getAllCategoryService,
  createCategoryService,
  editCategoryService,
  deleteCategoryService,
};
