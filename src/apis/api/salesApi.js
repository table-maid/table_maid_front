import instansce  from "../utils/instance";

export const getSalesRequest = async () => {
    return await instansce.get("/sales/menu");
};