import instance from "../utils/instance";

export const getCompanyNameRequest = async (params) => {
    const response = await instance.get("/user/company/name", { params });
    return response;
};

export const getCategoriesRequest = async (params) => {
    const response = await instance.get("/user/category", { params });
    return response;
};

export const getMenusRequest = async (params) => {
  const response = await instance.get("/user/menu", { params });
  return response;
};