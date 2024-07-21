"use server";

import axiosInstance from "@/actions/axiosInstance";
import { handleAxiosError } from "@/utils";

export async function getLetters(category: string) {
	try {
		const response = await axiosInstance.get(`letters/?category=${category}`);
		return response.data;
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
		handleAxiosError(error);
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
		handleAxiosError(error);
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
		handleAxiosError(error);
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
		handleAxiosError(error);
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
		handleAxiosError(error);
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
		handleAxiosError(error);
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
		handleAxiosError(error);
	}
}
