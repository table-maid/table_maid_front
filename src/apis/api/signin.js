import instance from "../utils/instance"

export const signinRequest = async (data) => {
    const response = await instance.post("/admin/auth/signin", data);
    return response;
}