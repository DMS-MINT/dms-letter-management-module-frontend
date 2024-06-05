"use server";

import axiosInstance from "@/lib/axiosInstance";
import { ICredentials } from "@/typing";

interface ServerError {
  message: string;
  extra: Record<string, any>;
}

export async function get_authentication_token(credentials: ICredentials) {
  try {
    const response = await axiosInstance.post("auth/login/", credentials);
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log(process.env.BASE_API_URL);
    if (error.response && error.response.data) {
      error.response.data.extra.fields.non_field_errors.map((msg: string) => {
        throw msg;
      });
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}

export async function delete_authentication_token() {
  try {
    const response = await axiosInstance.post("auth/logout/");
    const data = await response.data;
    console.log(data);
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}

export async function get_user_profile() {
  try {
    const response = await axiosInstance.get("auth/me/");
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}
