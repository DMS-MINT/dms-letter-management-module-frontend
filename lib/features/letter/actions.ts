"use server";

import axiosInstance from "@/lib/axiosInstance";
import { ILetterCreateSerializer, ILetterUpdateSerializer } from "@/typing";
import { get_session } from "@/lib/features/authentication/actions";

interface ServerError {
  message: string;
  extra: Record<string, any>;
}

export async function get_letters() {
  try {
    const session = await get_session();
    const bearerToken = session.token.token;

    const response = await axiosInstance.get("letters/?category=draft", {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}
export async function get_letter_details(id: string) {
  try {
    const response = await axiosInstance.get(`letters/${id}/`);
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}
export async function create_letter(letter: ILetterCreateSerializer) {
  try {
    const session = await get_session();
    const bearerToken = session.token.token;

    const response = await axiosInstance.post("letters/create/", letter, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
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
    if (error.response && error.response.data) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}

export async function delete_letter(id: string) {
  try {
    const response = await axiosInstance.delete(`letters/delete/${id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}
