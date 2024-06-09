import instance from "../utils/instance";

export const getSalesRequest = async (adminId) => {
    return await instance.get("/sales/total", {
        params: { adminId }
    });
};

export const getSelectSalesRequest = async (adminId) => {
    return await instance.get("/sales/total/select", {
        params: { adminId }
    });
};

export const getMenuTotalSalesRequest = async (params) => {
    return await instance.get("/sales/menu/total", { params });
};
