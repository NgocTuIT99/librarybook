import axios from "../axios";

const getAllBookService = (accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-book?`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const getAllBookByCategoryService = (inputId, accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-book-by-category?id=${inputId}`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const createBookService = (data, accessToken, axiosJWT) => {
  return axiosJWT.post("/api/create-book", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const editBookService = (data, accessToken, axiosJWT) => {
  return axiosJWT.put("/api/edit-book", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const deleteBookService = (id, accessToken, axiosJWT) => {
  return axiosJWT.delete("/api/delete-book", {
    data: {
      id: id,
    },
    headers: { token: `Bearer ${accessToken}` }
  });
};

export {
  getAllBookService,
  getAllBookByCategoryService,
  createBookService,
  editBookService,
  deleteBookService,
};
