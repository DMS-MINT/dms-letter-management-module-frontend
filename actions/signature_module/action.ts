import axiosInstance from "@/actions/axiosInstance";

export async function get_default_signature(password: string) {
	try {
		const response = await axiosInstance.post("auth/retrieve-signature/", {
			password,
		});
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}
