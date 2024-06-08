import instance from "../utils/instance"

export const sendAuthMailRequest = async (email) => {
    return await instance.post(`/mail/${email}/send/authenticate/`)
}