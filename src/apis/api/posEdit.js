import instance from "../utils/instance"

export const saveFloorTableRequest = async (data) => {
    return await instance.post("/pos/floor/table", data)
}