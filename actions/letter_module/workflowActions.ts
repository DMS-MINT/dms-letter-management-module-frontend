"use server";

import axiosInstance from "@/actions/axiosInstance";
import { ParamsType } from "@/hooks";
import { ShareLetterRequestType } from "@/types/letter_module";
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
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}

export async function submitLetter({
	referenceNumber,
}: {
	referenceNumber: string;
}) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/submit/`);
		return "ደብዳቤው በተሳካ ሁኔታ ወደ መዝገብ ቤት ገብቷል።";
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}

export async function publishLetter({ referenceNumber, otp }: ParamsType) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/publish/`,
			{ otp }
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}

export async function rejectLetter({ referenceNumber, otp }: ParamsType) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/reject/`,
			{ otp }
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}

export async function retractLetter({ referenceNumber, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${referenceNumber}/retract/`, { otp });
		return "ደብዳቤ በተሳካ ሁኔታ አሁን ካለበት ሁኔታ ተነስቷል።";
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}

export async function closeLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(`letters/${referenceNumber}/close/`);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}
export async function reopenLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/reopen/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw getErrorMessage(workflowErrorMessages, error);
	}
}
