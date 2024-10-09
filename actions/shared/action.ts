"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { commentErrorMessages } from "./errorMessages";

export type CreateCommentParams = {
	id: string;
	message: string;
};

export type UpdateCommentParams = {
	comment_id: string;
	message: string;
};

export async function createComment({ id, message }: CreateCommentParams) {
	try {
		await axiosInstance.post(`comments/${id}/create/`, {
			message,
		});

		return { ok: true, message: "ደብዳቤ ለተገለጹት ተባባሪዎች ተጋርቷል።" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(commentErrorMessages, error) };
	}
}

export async function updateComment({
	comment_id,
	message,
}: UpdateCommentParams) {
	console.log("🚀 ~ comment_id:", comment_id);
	console.log("🚀 ~ message:", message);

	try {
		await axiosInstance.put(`comments/${comment_id}/update/`, {
			message,
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
