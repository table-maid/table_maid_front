import instance from "../utils/instance"

export const sendMenu = async (data) => {
    return await instance.post("/send/menus", data)
}