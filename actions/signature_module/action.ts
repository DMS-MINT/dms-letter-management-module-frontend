"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { workflowErrorMessages } from "../letter_module/errorMessages";

export async function getDefaultSignature(otp: number) {
	try {
		const response = await axiosInstance.post("signatures/retrieve-signature/", {
			otp,
		});

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
