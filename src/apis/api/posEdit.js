import instance from "../utils/instance"

export const saveFloorTableRequest = async (data) => {
    return await instance.post("/pos/floor/table", data)
};

export const selectFloorTableRequest = async (adminId) => {
    return await instance.get("/pos/floor/table", { params: { adminId } });
};