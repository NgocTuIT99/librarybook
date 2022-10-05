import axios from "../axios";

const getAllBookService = () => {
  return axios.get(`/api/get-all-book?`);
};

const getAllBookByCategoryService = (inputId) => {
  return axios.get(`/api/get-all-book-by-category?id=${inputId}`);
};

const createBookService = (data) => {
  return axios.post("/api/create-book", data);
};

const editBookService = (data) => {
  return axios.put("/api/edit-book", data);
};

const deleteBookService = (id) => {
  return axios.delete("/api/delete-book", {
    data: {
      id: id,
    },
  });
};

export {
  getAllBookService,
  getAllBookByCategoryService,
  createBookService,
  editBookService,
  deleteBookService,
};
