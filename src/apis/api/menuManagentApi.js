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
    return await instance.post("/menu/menus", data)
}

export const registerOptionTitle = async(data) => {
    return await instance.post("/menu/option/title", data)
}

export const registerOption = async(data) => {
    return await instance.post("/menu/option/name", data)
}

export const serachMenuList = async (params) => {
    return await instance.get("/menu/list", {params})
}

export const removeMenu = async (params) => {
    return await instance.delete("menu/menus", {data: params})
}

export const searchMenuDetail = async (params) => {
    return await instance.get("menu/detail", {params})
}

export const updateMenuDetail = async (data) => {
    return await instance.put("menu/menus", data)
}

export const updateMenuOption = async (data) => {
    return await instance.put("menu/option", data)
}

export const updateMenuOptionTitle = async (data) => {
    return await instance.put("menu/option/title", data)
}

export const deleteOptionTitle = async (data) => {
    return await instance.delete("menu/option/title", { data: data });
};

export const deleteOption = async (data) => {
    return await instance.delete("menu/option/name", { data: data });
};

