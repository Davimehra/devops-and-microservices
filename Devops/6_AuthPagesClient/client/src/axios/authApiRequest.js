import axios from "axios";

const authApiRequest = axios.create({
    withCredentials: true,
})

const beforeRequest = axios.interceptors.request.use((config) => { }, (err) => { })

