"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { commentErrorMessages } from "./errorMessages";

export type CreateCommentParams = {
	reference_number: string;
	content: string;
};

export type UpdateCommentParams = {
	comment_id: string;
	content: string;
};

export async function createComment({
	reference_number,
	content,
}: CreateCommentParams) {
	try {
		await axiosInstance.post(`comments/${reference_number}/create/`, {
			content,
		});

		return { ok: true, message: "ደብዳቤ ለተገለጹት ተባባሪዎች ተጋርቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(commentErrorMessages, error) };
	}
}

export async function updateComment({
	comment_id,
	content,
}: UpdateCommentParams) {
	try {
		await axiosInstance.put(`comments/${comment_id}/update/`, {
			content,
		});

		return { ok: true, message: "አስተያየቱ በተሳካ ሁኔታ ተቀይሯል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(commentErrorMessages, error) };
	}
}

export async function deleteComment(comment_id: string) {
	try {
		await axiosInstance.delete(`comments/${comment_id}/delete/`);

		return { ok: true, message: "አስተያየቱ በተሳካ ሁኔታ ተሰርዟል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(commentErrorMessages, error) };
	}
}
