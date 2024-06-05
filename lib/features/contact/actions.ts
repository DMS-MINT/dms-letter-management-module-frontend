"use server";

import axiosInstance from "@/lib/axiosInstance";

interface ServerError {
  message: string;
  extra: Record<string, any>;
}

export async function get_contacts() {
  try {
    const response = await axiosInstance.get("users/");
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
