import { IServerErrorResponse } from "@/typing/interface";
import { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError): never => {
  if (error.response) {
    const responseData = error.response.data as IServerErrorResponse;
    const serverErrorMessage: string =
      responseData.message || "An unknown error occurred";
    throw serverErrorMessage;
  } else if (error.request) {
    throw new Error("Network Error: No response received");
  } else {
    throw new Error("Request Error: Unable to send request");
  }
};

export default handleAxiosError;
