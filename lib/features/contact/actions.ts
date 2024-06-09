"use server";

import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/utils";

export async function get_contacts() {
  try {
    const response = await axiosInstance.get("users/");
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
