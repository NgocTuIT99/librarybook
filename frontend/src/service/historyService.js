import axios from "../axios";

const getAllHistoryService = (accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-history`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const getAllHistoryByUserService = (inputId, accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-history-by-user?id=${inputId}`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const borrowBookService = (data, accessToken, axiosJWT) => {
  return axiosJWT.post("/api/borrow-book", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const returnBookService = (data, accessToken, axiosJWT) => {
  return axiosJWT.post("/api/return-book", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

export {
  getAllHistoryService,
  borrowBookService,
  returnBookService,
  getAllHistoryByUserService,
};
