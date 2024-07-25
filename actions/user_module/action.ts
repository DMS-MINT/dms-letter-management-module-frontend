"use server";

import axiosInstance from "@/actions/axiosInstance";

export async function getMyProfile() {
	try {
		const response = await axiosInstance.get("auth/me/");
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}
