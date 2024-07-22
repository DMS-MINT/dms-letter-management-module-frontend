"use server";

import axiosInstance from "@/actions/axiosInstance";

export async function getDefaultSignature(otp: number) {
	try {
		const response = await axiosInstance.post("signatures/retrieve-signature/", {
			otp,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status === 400) {
			throw "የተሳሳተ የማረጋገጫ ኮድ፣ እባክዎ እንደገና ይሞክሩ።";
		}
		throw error.message;
	}
}
