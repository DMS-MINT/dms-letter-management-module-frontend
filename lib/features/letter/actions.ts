"use server";

import axiosInstance from "@/lib/axiosInstance";
import {
  ILetterCreateSerializer,
  ILetterUpdateSerializer,
} from "@/typing/interface";
import { handleAxiosError } from "@/utils";

export async function get_letters(category: string) {
  try {
    const response = await axiosInstance.get(`letters/?category=${category}`);
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function get_letter_details(reference_number: string) {
  try {
    const response = await axiosInstance.get(`letters/${reference_number}/`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
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

export async function create_or_submit_letter(letter: ILetterCreateSerializer) {
  try {
    const response = await axiosInstance.post(
      "letters/create_or_submit/",
      letter
    );

    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function update_letter(
  reference_number: string,
  letter: ILetterUpdateSerializer
) {
  try {
    const response = await axiosInstance.put(
      `letters/${reference_number}/update/`,
      letter
    );

    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function delete_letter(reference_number: string) {
  try {
    const response = await axiosInstance.delete(
      `letters/${reference_number}/delete`
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function upload_file(formData: FormData) {
  try {
    const response = await axiosInstance.post("letters/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
