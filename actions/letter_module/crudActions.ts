"use server";

import axiosInstance from "@/actions/axiosInstance";
import getErrorMessage from "./getErrorMessage";

export async function getLetters(category: string) {
	try {
		const response = await axiosInstance.get(`letters/?category=${category}`);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function getLetterDetails(referenceNumber: string) {
	try {
		const response = await axiosInstance.get(`letters/${referenceNumber}/`);
		return response.data;
	} catch (error: any) {
		throw getErrorMessage(error);
	}
}

export async function createLetter(letter: FormData) {
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

export async function createAndSubmitLetter(letter: FormData) {
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

export async function createAndPublishLetter(letter: FormData) {
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

export async function updateLetter(referenceNumber: string, letter: FormData) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/update/`,
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

export async function moveToTrash(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(`letters/${referenceNumber}/trash/`);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function restoreFromTrash(referenceNumber: string) {
	try {
		const response = await axiosInstance.put(
			`letters/${referenceNumber}/restore/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function removeFromTrash(referenceNumber: string) {
	try {
		const response = await axiosInstance.delete(
			`letters/${referenceNumber}/remove_from_trash/`
		);
		const data = await response.data.message;
		return data;
	} catch (error: any) {
		throw error.message;
	}
}
