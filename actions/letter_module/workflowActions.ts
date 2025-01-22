"use server";

import axiosInstance from "@/actions/axiosInstance";
import type { ParamsType } from "@/hooks";
import type { ShareLetterRequestType } from "@/types/letter_module";
import getErrorMessage from "../getErrorMessage";
import { workflowErrorMessages } from "./errorMessages";

export async function shareLetter(params: [string, ShareLetterRequestType]) {
	const [id, participants] = params;
	try {
		await axiosInstance.post(`letters/${id}/share/`, participants);

		return { ok: true, message: "ደብዳቤ ለተገለጹት ተባባሪዎች ተጋርቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function submitLetter({ id, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${id}/submit/`, {
			otp,
		});

		return { ok: true, message: "ደብዳቤው በተሳካ ሁኔታ ወደ መዝገብ ቤት ገብቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function publishLetter({
	id,
	otp,
	reference_number,
	published_at,
}: ParamsType) {
	try {
		console.log("publish letter console log:", reference_number);
		await axiosInstance.put(`letters/${id}/publish/`, {
			otp,
			reference_number,
			published_at,
		});

		return { ok: true, message: "ደብዳቤው በተሳካ ሁኔታ ታትሟል እና ለሁሉም ተቀባዮች ይከፋፈላል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function rejectLetter({ id, otp, message }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${id}/reject/`, {
			otp,
			message,
		});

		return { ok: true, message: "ደብዳቤ ውድቅ ተደርጎ ወደ ላኪው ተመልሷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function retractLetter({ id, otp }: ParamsType) {
	try {
		await axiosInstance.put(`letters/${id}/retract/`, { otp });

		return { ok: true, message: "ደብዳቤ በተሳካ ሁኔታ አሁን ካለበት ሁኔታ ተነስቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function closeLetter(id: string) {
	try {
		await axiosInstance.put(`letters/${id}/close/`);

		return { ok: true, message: "ደብዳቤው በይፋ ተዘግቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function reopenLetter(id: string) {
	try {
		await axiosInstance.put(`letters/${id}/reopen/`);

		return { ok: true, message: "ደብዳቤው እንደገና ተከፍቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}

export async function sendEmail(id: string) {
	try {
		console.log("send");
		await axiosInstance.post(`letters/${id}/email/`);

		return { ok: true, message: "ኢሜል በተሳካ ሁኔታ ተልኳል።" };
	} catch (error: any) {
		console.log("error", error);
		console.log("workflowErrorMessages", workflowErrorMessages);
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
