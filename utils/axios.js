import axios from "axios";

const axiosInstance = axios.create({
    baseURL :import.meta.env.VITE_QUADB_TECH_API
})
export default axiosInstance
