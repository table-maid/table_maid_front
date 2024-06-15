import instance from "../utils/instance"

export const sendAuthMailRequest = async (email) => {
    return await instance.post(`/mail/${email}/send/authenticate/`)
}

export const verifyCodeRequest = async (data) => {
    return await instance.post("/mail/verify/authenticate", data)
}