import axiosInstance from "@/lib/axiosInstance";
import { IParticipantOutputSerializer } from "@/typing/interface";
import { handleAxiosError } from "@/utils";

export async function share_letter(
  letter_reference_number: string,
  participant: IParticipantOutputSerializer
) {
  try {
    const response = await axiosInstance.post(
      `letters/${letter_reference_number}/share`,
      participant
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
