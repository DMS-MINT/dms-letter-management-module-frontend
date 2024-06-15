"use server";

import axiosInstance from "@/lib/axiosInstance";
import {
  ILetterCreateSerializer,
  ILetterUpdateSerializer,
  IParticipantOutputSerializer,
} from "@/typing/interface";
import { handleAxiosError } from "@/utils";

export async function get_letters(category: string) {
  try {
    const response = await axiosInstance.get(`letters/?category=${category}/`);
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function get_letter_details(id: string) {
  try {
    const response = await axiosInstance.get(`letters/${id}/`);
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function create_letter(letter: ILetterCreateSerializer) {
  try {
    const response = await axiosInstance.post("letters/create/", letter);

    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function update_letter(
  id: string,
  letter: ILetterUpdateSerializer
) {
  try {
    const response = await axiosInstance.put(`letters/${id}/update/`, letter);
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function delete_letter(id: string) {
  try {
    const response = await axiosInstance.delete(`letters/${id}/delete`);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function forward_letter(
  letter_id: string,
  participant: IParticipantOutputSerializer
) {
  try {
    const response = await axiosInstance.post(
      `letters/forward/${letter_id}`,
      participant
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
