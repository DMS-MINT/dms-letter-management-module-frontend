import type { AxiosInstance } from "axios";
import axios from "axios";
import { get_session } from "./auth/action";

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.DJANGO_API_BASE_URL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor to include the session ID in every request
axiosInstance.interceptors.request.use(
	async (config) => {
		if (
			!config.url?.includes("auth/login/") &&
			!config.url?.includes("auth/forgot-password/") &&
			!config.url?.includes("auth/verify-otp/") &&
			!config.url?.includes("auth/reset-password/")
		) {
			const session = await get_session();
			const sessionId = session.sessionId;

			if (sessionId) {
				config.headers.Authorization = `Session ${sessionId}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
