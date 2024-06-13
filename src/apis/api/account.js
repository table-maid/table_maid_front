import instance from "../utils/instance"

export const searchUsernameByEmailRequest = async (data) => {
    return await instance.post("/mail/send/id", data);
}