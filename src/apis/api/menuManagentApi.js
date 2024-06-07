import instance from "../utils/instance";
import instansce from "../utils/instance";

export const searchCategoryRequest = async (params) => {
    return await instansce.get("/menu/categories", {params});
}

export const searchMenuRequest = async (params) => {
    return await instansce.get("/menu/menus", {params});
}

export const searchOptionRequest = async (params) => {
    return await instansce.get("/menu/option", {params});
}

export const searchOptionTitleRequest = async (params) => {
    return await instance.get("/menu/option/title", {params})
}

export const registerCategory = async(data) => {
    return await instance.post("/menu/category", data)
}

export const registerMenu = async(data) => {
    return await instance.post("/menu/menu", data)
}

export const registerOptionTitle = async(data) => {
    return await instance.post("/menu/option/title", data)
}

export const registerOption = async(data) => {
    return await instance.post("/menu/option", data)
}
