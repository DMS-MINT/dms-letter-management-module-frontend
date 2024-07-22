"use server";

import { ShareLetterRequestType } from "@/types/letter_module";
import axiosInstance from "@/lib/axiosInstance";

export async function getLetters(category: string) {
	try {
		const response = await axiosInstance.get(`letters/?category=${category}`);
		return response.data.letters;
	} catch (error: any) {
		throw error.message;
	}
}

export async function get_letter_details(reference_number: string) {
	try {
		const response = await axiosInstance.get(`letters/${reference_number}/`);

		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function create_letter(letter: FormData) {
	try {
		const response = await axiosInstance.post("letters/create/", letter, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		const data = await response.data;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function create_and_submit_letter(letter: FormData) {
	try {
		const response = await axiosInstance.post(
			"letters/create_and_submit/",
			letter,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		const data = await response.data;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function create_and_publish_letter(letter: FormData) {
	try {
		const response = await axiosInstance.post(
			"letters/create_and_publish/",
			letter,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		const data = await response.data;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function update_letter(
	reference_number: string,
	letter: FormData
) {
	try {
		const response = await axiosInstance.put(
			`letters/${reference_number}/update/`,
			letter,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		const data = await response.data;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function move_to_trash(reference_number: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${reference_number}/trash/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function restore_from_trash(reference_number: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${reference_number}/restore/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function remove_from_trash(reference_number: string) {
	try {
		const response = await axiosInstance.delete(
			`letters/${reference_number}/remove_from_trash/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function share_letter(
	reference_number: string,
	participants: ShareLetterRequestType
) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/share/`,
			participants
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function submit_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/submit/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function publish_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/publish/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function reject_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/reject/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function retract_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/retract/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function close_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/close/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
export async function reopen_letter(reference_number: string) {
	try {
		const response = await axiosInstance.post(
			`letters/${reference_number}/reopen/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function create_comment(
	content: string,
	reference_number: string
) {
	try {
		const response = await axiosInstance.post(
			`comments/${reference_number}/create/`,
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

export async function update_comment(comment_id: string, content: string) {
	try {
		const response = await axiosInstance.put(`comments/${comment_id}/update/`, {
			content,
		});
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
export async function delete_comment(comment_id: string) {
	try {
		const response = await axiosInstance.delete(`comments/${comment_id}/delete/`);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
