"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { workflowErrorMessages } from "../letter_module/errorMessages";

export async function getListofLedger() {
	try {
		const response = await axiosInstance.get("ledgers/");
		console.log("response for ledger list", response.data.ledgers);
		return { ok: true, message: response.data.ledgers };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
export async function getLedgerById(id: string) {
	try {
		const response = await axiosInstance.get(`ledgers/${id}/detail/`);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
export async function getLedgerPdf(id: string) {
	try {
		const response = await axiosInstance.get(`ledgers/${id}/pdf/`);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
