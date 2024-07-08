"use server";

import axiosInstance from "@/lib/axiosInstance";
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
    const response = await axiosInstance.delete(
      `letters/${reference_number}/trash`
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
