"use server";

import axiosInstance from "@/actions/axiosInstance";

export type CreateCommentParams = {
	reference_number: string;
	content: string;
};

export type UpdateCommentParams = {
	comment_id: string;
	content: string;
};

export async function create_comment({
	reference_number,
	content,
}: CreateCommentParams) {
	try {
		const response = await axiosInstance.post(
			`comments/${reference_number}/create/`,
			{
				content,
			}
		);
		return response.data;
	} catch (error: any) {
		const errorMessage = error.message;
		throw errorMessage;
	}
}

export async function update_comment({
	comment_id,
	content,
}: UpdateCommentParams) {
	try {
		const response = await axiosInstance.put(`comments/${comment_id}/update/`, {
			content,
		});
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function delete_comment(comment_id: string) {
	try {
		const response = await axiosInstance.delete(`comments/${comment_id}/delete/`);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}
