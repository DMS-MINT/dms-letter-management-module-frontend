// src/api/lettersApi.ts
import axiosInstance from "./axiosConfig";

interface Letter {
  title: string;
  content: string;
}

export const createLetter = async (letterData: Letter): Promise<any> => {
  try {
    const response = await axiosInstance.post("/letters/create/", letterData);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the letter!", error);
    throw error;
  }
};
