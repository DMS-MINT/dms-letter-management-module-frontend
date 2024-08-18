"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ProfileFormData } from "@/components/UserProfile/ProfileDetail/ProfileDetail";
import type { NewContactType } from "@/types/user_module";
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

export async function getUsers() {
	try {
		const response = await axiosInstance.get("users/");

		return { ok: true, message: response.data.users };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}

export async function getEnterprises() {
	try {
		const response = await axiosInstance.get("enterprises/");

		return { ok: true, message: response.data.enterprises };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}

export async function getContacts() {
	try {
		const response = await axiosInstance.get("contacts/");

		return { ok: true, message: response.data.contacts };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}

export async function AddContacts(data: NewContactType) {
	try {
		await axiosInstance.post("contacts/create/", data);

		return { ok: true, message: "አዲስ እውቂያ ተገኝቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
export async function UpdateContacts(id: string, data: NewContactType) {
	try {
		await axiosInstance.post(`contacts/${id}/update/`, data);

		return { ok: true, message: "እውቂያው በተሳካ ሁኔታ ተቀይሯል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
export async function DeleteContacts(id: string) {
	try {
		await axiosInstance.delete(`contacts/${id}/delete/`);

		return { ok: true, message: "እውቂያው በተሳካ ሁኔታ ተሰርዟል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}

export async function updateProfile(data: ProfileFormData) {
	try {
		const response = await axiosInstance.patch("users/profile/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
