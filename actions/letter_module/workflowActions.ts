"use server";

import axiosInstance from "@/actions/axiosInstance";
import { ShareLetterRequestType } from "@/types/letter_module";

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
		throw error.message;
	}
}

export async function submitLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/submit/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function publishLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/publish/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function rejectLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/reject/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function retractLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/retract/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function closeLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/close/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
export async function reopenLetter(referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${referenceNumber}/reopen/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function createComment(content: string, referenceNumber: string) {
	try {
		const response = await axiosInstance.post(
			`comments/${referenceNumber}/create/`,
			{
				content,
			}
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function updateComment(commentId: string, content: string) {
	try {
		const response = await axiosInstance.put(`comments/${commentId}/update/`, {
			content,
		});
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
export async function deleteComment(commentId: string) {
	try {
		const response = await axiosInstance.delete(`comments/${commentId}/delete/`);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
