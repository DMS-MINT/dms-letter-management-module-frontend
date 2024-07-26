"use server";

import axiosInstance from "@/actions/axiosInstance";
import { authErrorMessages } from "../auth/errorMessages";
import getErrorMessage from "../getErrorMessage";

export async function getDefaultSignature(otp: number) {
	try {
		const response = await axiosInstance.post("signatures/retrieve-signature/", {
			otp,
		});

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(authErrorMessages, error) };
	}
}
