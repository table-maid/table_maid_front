import { instance } from "../utils/instance";

export const getSalesRequest = async () => {
    return await instance.get("/admin/sales");
};