"use server";

import axiosInstance from "@/lib/axiosInstance";
import { IComment, ICommentCreate, IShareLetterFormData } from "@/typing/interface";
import { handleAxiosError } from "@/utils";

export async function share_letter(
  reference_number: string,
  participants: IShareLetterFormData
) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/share/`,
      participants
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
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
    handleAxiosError(error);
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
    handleAxiosError(error);
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
    handleAxiosError(error);
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
    handleAxiosError(error);
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
    handleAxiosError(error);
  }
}

export async function create_comment(comment: ICommentCreate, reference_number: string) {
  try {
    const response = await axiosInstance.post(`comments/${reference_number}/create/`, comment);
    return response.data; 
  } catch (error: any) {
    handleAxiosError(error);
  }
} 


export async function edit_comment(comment: IComment) {
  try {
    const comment_id: string = comment.id
    const content: string = comment.content
    const response = await axiosInstance.put(`comments/${comment_id}/update/`, {content});
    return response.data; 
  } catch (error: any) {
    handleAxiosError(error);
  }
}
export async function delete_comment(comment_id: string) {
  try {
    const response = await axiosInstance.delete(`comments/${comment_id}/delete/`);
    return response.data; 
  } catch (error: any) {
    handleAxiosError(error);
  }
}