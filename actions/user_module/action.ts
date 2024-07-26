"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { userErrorMessages } from "./errorMessages";

export async function getMyProfile() {
	try {
		const response = await axiosInstance.get("auth/me/");
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function getAllUsers() {
	try {
		const response = await axiosInstance.get("users/");

		return { ok: true, message: response.data.users };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
