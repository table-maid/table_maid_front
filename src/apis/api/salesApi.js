import instansce  from "../utils/instance";

export const getSalesRequest = async (adminId) => {
    return await instansce.get("/sales/total", adminId);
};

export const getSelectSalesRequest = async (adminId) => {
    return await instansce.get("/sales/total/select", adminId);
};

export const getMenuTotalSalesRequest = async (params) => {
    return await instansce.get("/sales/menu/total", {params});
};