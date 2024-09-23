"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ParamsType } from "@/hooks";
import getErrorMessage from "../getErrorMessage";
import { curdErrorMessages, deleteErrorMessages } from "./errorMessages";

interface BatchParamsType {
	referenceNumbers: string[];
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

export async function getLetterDetails(referenceNumber: string) {
	try {
		const response = await axiosInstance.get(`letters/${referenceNumber}/`);

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
		const [referenceNumber, formData] = params;
		await axiosInstance.put(`letters/${referenceNumber}/update/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return { ok: true, message: "ለውጦችን በተሳካ ሁኔታ ተቀምጠዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function moveToTrash(referenceNumber: string) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/trash/`);

		return { ok: true, message: "ደብዳቤው በተሳካ ሁኔታ ወደ መጣያው ተወስዷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

export async function restoreFromTrash(referenceNumber: string) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/restore/`);

		return { ok: true, message: "ደብዳቤው ከመጣያው ተመልሷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

export async function permanentlyDelete({ referenceNumber, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/permanently_delete/`, {
			otp,
		});

		return { ok: true, message: "ደብዳቤው በቋሚነት ተሰርዟል። ወደነበረበት መመለስ አይቻልም.።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Move multiple rows to trash
export async function moveToTrashBatch({ referenceNumbers }: BatchParamsType) {
	try {
		const reference_numbers = referenceNumbers;
		await axiosInstance.put("letters/batch/trash/", {
			reference_numbers,
		});

		return { ok: true, message: "ደብዳቤዎቹ በተሳካ ሁኔታ ወደ መጣያው ተወስደዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Restore multiple rows from trash
export async function restoreFromTrashBatch({
	referenceNumbers,
}: BatchParamsType) {
	try {
		const reference_numbers = referenceNumbers;
		await axiosInstance.put("letters/batch/restore/", {
			reference_numbers,
		});

		return { ok: true, message: "ደብዳቤዎቹ ከመጣያው ተመልሰዋል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}

// Permanently delete multiple rows
export async function permanentlyDeleteBatch({
	referenceNumbers,
	otp,
}: BatchParamsType) {
	try {
		const reference_numbers = referenceNumbers;
		await axiosInstance.put("letters/batch/permanently_delete/", {
			reference_numbers,
			otp,
		});

		return { ok: true, message: "ደብዳቤዎቹ በቋሚነት ተሰርዘዋል። ወደነበረበት መመለስ አይቻልም.።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(deleteErrorMessages, error) };
	}
}
