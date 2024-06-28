import instance from "../utils/instance"

export const sendMenu = async (data) => {
    return await instance.post("/send/menus", data)
}

export const searchOrderList = async (params) => {
    return await instance.get("/sales/payment", {params})
}

export const searchOrderDetail = async (params) => {
    return await instance.get("/sales/payment/detail", {params})
}

export const addRefundDetail = async (data) => {
    return await instance.post("/sales/refund/detail", data)
}