import axios from "axios"

const instance = axios.create({
    baseURL: "https://tablemaid.shop",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
});

export default instance;