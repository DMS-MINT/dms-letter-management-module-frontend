"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ParamsType } from "@/hooks";
import getErrorMessage from "../getErrorMessage";
import { curdErrorMessages, deleteErrorMessages } from "./errorMessages";

interface BatchParamsType {
	id: string[] | "";
	otp?: string;
}

export async function getLetters(category: string) {
	try {
		const response = await axiosInstance.get(`letters/?category=${category}`);
		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function getLetterDetails(id: string) {
	try {
		const response = await axiosInstance.get(`letters/${id}/`);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function createLetter(formData: FormData) {
	try {
		const response = await axiosInstance.post("letters/create/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return { ok: true, message: response.data.letter };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function createAndSubmitLetter(formData: FormData) {
	console.log(formData);
	try {
		const response = await axiosInstance.post(
			"letters/create_and_submit/",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function createAndPublishLetter(formData: FormData) {
	try {
		const response = await axiosInstance.post(
			"letters/create_and_publish/",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		console.log(response.data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function updateLetter(params: [string, FormData]) {
	try {
		const [id, formData] = params;
		await axiosInstance.put(`letters/${id}/update/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return { ok: true, message: "ለውጦችን በተሳካ ሁኔታ ተቀምጠዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function moveToTrash(id: string) {
	try {
		await axiosInstance.put(`letters/${id}/trash/`);

		return { ok: true, message: "ደብዳቤው በተሳካ ሁኔታ ወደ መጣያው ተወስዷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

export async function restoreFromTrash(id: string) {
	try {
		await axiosInstance.put(`letters/${id}/restore/`);

		return { ok: true, message: "ደብዳቤው ከመጣያው ተመልሷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

export async function permanentlyDelete({ id, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${id}/delete/`, {
			otp,
		});

		return { ok: true, message: "ደብዳቤው በቋሚነት ተሰርዟል። ወደነበረበት መመለስ አይቻልም.።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Move multiple rows to trash
export async function moveToTrashBatch({ id }: BatchParamsType) {
	try {
		const ids = id;
		await axiosInstance.put("letters/bulk/trash/", {
			ids,
		});

		return { ok: true, message: "ደብዳቤዎቹ በተሳካ ሁኔታ ወደ መጣያው ተወስደዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Restore multiple rows from trash
export async function restoreFromTrashBatch({ id }: BatchParamsType) {
	try {
		const ids = id;
		await axiosInstance.put("letters/bulk/restore/", {
			ids,
		});

		return { ok: true, message: "ደብዳቤዎቹ ከመጣያው ተመልሰዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Permanently delete multiple rows
export async function permanentlyDeleteBatch({ id, otp }: BatchParamsType) {
	try {
		const ids = id;
		await axiosInstance.put("letters/bulk/delete/", {
			ids,
			otp,
		});

		return { ok: true, message: "ደብዳቤዎቹ በቋሚነት ተሰርዘዋል። ወደነበረበት መመለስ አይቻልም.።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}
