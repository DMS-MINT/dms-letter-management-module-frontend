"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ProfileFormData } from "@/components/UserProfile/ProfileDetail/ProfileDetail";
import type { ParticipantEntriesType } from "@/types/letter_module";
import type { NewContactType } from "@/types/user_module";
import getErrorMessage from "../getErrorMessage";
import { userErrorMessages } from "./errorMessages";

export type MemberEntriesFilterType =
	| "all"
	| "admin"
	| "staff"
	| "staff_and_admin";

export async function getMyProfile() {
	try {
		const response = await axiosInstance.get("auth/me/");
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function getParticipantEntries(
	params: [MemberEntriesFilterType, boolean, boolean]
) {
	try {
		const [members, enterprises, contacts] = params;

		const response = await axiosInstance.get(
			`participants/entries?members=${members}&enterprises=${enterprises}&contacts=${contacts}`
		);

		return { ok: true, message: response.data.entries as ParticipantEntriesType };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}

export async function getUsers(filter: string) {
	try {
		const response = await axiosInstance.get(
			`members?filter=${filter}&include_current_user=false`
		);

		return { ok: true, message: response.data.members };
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

export async function updateProfile(data: ProfileFormData) {
	try {
		const response = await axiosInstance.patch("users/profile/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(userErrorMessages, error) };
	}
}
