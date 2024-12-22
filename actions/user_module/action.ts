"use server";

import axiosInstance from "@/actions/axiosInstance";
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

export async function getUsers(filter: string) {
	try {
		const response = await axiosInstance.get(
			`users/?filter=${filter}&include_current_user=false`
		);

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

export async function getDepartments() {
	try {
		const response = await axiosInstance.get("departments/");
		return { ok: true, message: response.data.departments };
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

export async function updateProfile(params: Record<string, any>) {
	try {
		const response = await axiosInstance.post("users/update/", params, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { ok: true, message: "ለውጦችን በተሳካ ሁኔታ ተቀምጠዋል።", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
