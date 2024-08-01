import instance from "../utils/instance"

export const saveFloorTableRequest = async (data) => {
    return await instance.post("/pos/floor/table", data)
};

export const saveTableRequest = async (data) => {
  return await instance.post("/pos/table", data);
};

export const selectFloorTableRequest = async (adminId) => {
    return await instance.get("/pos/floor/table", { params: { adminId } });
};

export const deleteTableRequest = async (data) => {
  return await instance.delete("/pos/floor/table", { data });
};

export const deleteFloorRequest = async (data) => {
  return await instance.delete("/pos/floor", { data });
};

export const updateTableRequest = async (data) => {
  return await instance.put("/pos/floor/table", data);
};