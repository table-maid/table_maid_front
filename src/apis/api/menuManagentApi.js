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

