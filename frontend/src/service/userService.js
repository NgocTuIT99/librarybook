import axios from "../axios";
import { refreshTokenJWT } from "../axiosJWT";

const handleLoginService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUserService = (accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-user`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const createUserService = (data, accessToken, axiosJWT) => {
  return axiosJWT.post("/api/create-user", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const editUserService = (data, accessToken, axiosJWT) => {
  return axiosJWT.put("/api/edit-user", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const deleteUserService = (id, accessToken, axiosJWT) => {
  return axiosJWT.delete("/api/delete-user", {
    data: {
      id: id,
    },
    headers: { token: `Bearer ${accessToken}` }
  });
};

const refreshTokenService = (refreshToken) => {
  return axios.post("/api/refresh", { refreshToken });
};

const logOut = (accessToken, axiosJWT) => {
  return axiosJWT.post("/api/refresh", {
    withCredentials: true,
    headers: { token: `Bearer ${accessToken}` }
  });
};

const getTokenLoginService = (data) => {
  return axios.post("/api/get-token-login", data);
}

export {
  handleLoginService,
  getAllUserService,
  createUserService,
  editUserService,
  deleteUserService,
  refreshTokenService,
  logOut,
  getTokenLoginService
};
