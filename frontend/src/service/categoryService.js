import axios from "../axios";

const getAllCategoryService = (accessToken, axiosJWT) => {
  return axiosJWT.get(`/api/get-all-category`, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const createCategoryService = (data, accessToken, axiosJWT) => {
  return axiosJWT.post("/api/create-category", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const editCategoryService = (data, accessToken, axiosJWT) => {
  return axiosJWT.put("/api/edit-category", data, {
    headers: { token: `Bearer ${accessToken}` }
  });
};

const deleteCategoryService = (id, accessToken, axiosJWT) => {
  return axiosJWT.delete("/api/delete-category", {
    data: {
      id: id,
    },
    headers: { token: `Bearer ${accessToken}` }
  });
};

export {
  getAllCategoryService,
  createCategoryService,
  editCategoryService,
  deleteCategoryService,
};
