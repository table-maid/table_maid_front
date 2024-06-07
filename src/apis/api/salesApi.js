import instansce  from "../utils/instance";

export const getSalesRequest = async () => {
    return await instansce.get("/sales/total");
};

export const getSelectSalesRequest = async () => {
    return await instansce.get("/sales/total/select");
};