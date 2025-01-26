"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { workflowErrorMessages } from "../letter_module/errorMessages";

export async function getListofLedger() {
	try {
		const response = await axiosInstance.get("ledgers/");
		console.log("response for ledger list", response.data);
		return { ok: true, message: response.data.ledgers };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
export async function getListofMyLedger() {
	try {
		const response = await axiosInstance.get("ledgers/shared/");
		console.log("response for ledger my list", response.data);
		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
export async function getLedgerById(id: string) {
	try {
		const response = await axiosInstance.get(`ledgers/${id}/detail/`);
		console.log("detail view", response.data);

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
export async function shareLedger(id: string, to: string) {
	try {
		const sendTo = { shared_to: to };
		const response = await axiosInstance.post(`ledgers/${id}/share/`, sendTo);

		return { ok: true, message: response.data.message };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(workflowErrorMessages, error) };
	}
}
