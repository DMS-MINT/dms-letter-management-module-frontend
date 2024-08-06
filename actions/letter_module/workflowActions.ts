"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ParamsType } from "@/hooks";
import type { ShareLetterRequestType } from "@/types/letter_module";
import getErrorMessage from "../getErrorMessage";
import { workflowErrorMessages } from "./errorMessages";

export async function shareLetter(
	referenceNumber: string,
	participants: ShareLetterRequestType
) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/share/`,
			participants
		);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function submitLetter({ referenceNumber, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/submit/`, {
			otp,
		});

		return { ok: true, message: "ደብዳቤው በተሳካ ሁኔታ ወደ መዝገብ ቤት ገብቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function publishLetter({ referenceNumber, otp }: ParamsType) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/publish/`,
			{ otp }
		);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function rejectLetter({ referenceNumber, otp }: ParamsType) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/reject/`,
			{ otp }
		);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function retractLetter({ referenceNumber, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/retract/`, { otp });

		return { ok: true, message: "ደብዳቤ በተሳካ ሁኔታ አሁን ካለበት ሁኔታ ተነስቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function closeLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(`letters/${referenceNumber}/close/`);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
export async function reopenLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/reopen/`
		);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
