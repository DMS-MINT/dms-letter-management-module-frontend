"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ParamsType } from "@/hooks";
import type { DraftLetterType } from "@/types/letter_module";
import getErrorMessage from "../getErrorMessage";
import { curdErrorMessages } from "./errorMessages";

interface BatchParamsType {
	referenceNumbers: string[];
	otp?: number;
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

export async function createLetter(letter: DraftLetterType) {
	try {
		const response = await axiosInstance.post("letters/create/", letter);

		return { ok: true, message: response.data.letter };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(curdErrorMessages, error) };
	}
}

export async function createAndSubmitLetter(letter: FormData) {
	try {
		const response = await axiosInstance.post(
			"letters/create_and_submit/",
			letter,
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

export async function createAndPublishLetter(letter: FormData) {
	try {
		const response = await axiosInstance.post(
			"letters/create_and_publish/",
			letter,
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

export async function updateLetter(referenceNumber: string, letter: FormData) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/update/`,
			letter,
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

export async function moveToTrash(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(`letters/${referenceNumber}/trash/`);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}

export async function restoreFromTrash(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/restore/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}

export async function permanentlyDelete({ referenceNumber, otp }: ParamsType) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/permanently_delete/`,
			{ otp }
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}

// Move multiple rows to trash
export async function moveToTrashBatch({ referenceNumbers }: BatchParamsType) {
	try {
		const reference_numbers = referenceNumbers;
		console.log("reference_number", reference_numbers);
		const response = await axiosInstance.put("letters/batch/trash/", {
			reference_numbers,
		});

		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}

// Restore multiple rows from trash
export async function restoreFromTrashBatch({
	referenceNumbers,
}: BatchParamsType) {
	try {
		const response = await axiosInstance.put("letters/batch/restore/", {
			referenceNumbers,
		});
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}

// Permanently delete multiple rows
export async function permanentlyDeleteBatch({
	referenceNumbers,
	otp,
}: BatchParamsType) {
	try {
		const response = await axiosInstance.put(
			"letters/batch/permanently_delete/",
			{
				referenceNumbers,
				otp,
			}
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(curdErrorMessages, error);
	}
}
