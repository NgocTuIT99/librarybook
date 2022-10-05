import axios from "../axios";

const getAllHistoryService = () => {
  return axios.get(`/api/get-all-history`);
};

const getAllHistoryByUserService = (inputId) => {
  return axios.get(`/api/get-all-history-by-user?id=${inputId}`);
};

const borrowBookService = (data) => {
  return axios.post("/api/borrow-book", data);
};

const returnBookService = (data) => {
  return axios.post("/api/return-book", data);
};

export {
  getAllHistoryService,
  borrowBookService,
  returnBookService,
  getAllHistoryByUserService,
};
