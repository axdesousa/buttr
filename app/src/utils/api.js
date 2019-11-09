import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

api.interceptors.request.use(async config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = token != null ? `Bearer ${token}` : `Bearer `
    return config
})

export default api
