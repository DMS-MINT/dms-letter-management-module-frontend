import axios, { AxiosInstance } from "axios";

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
