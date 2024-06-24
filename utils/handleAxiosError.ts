import { IServerErrorResponse } from "@/typing/interface";
import { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError): never => {
  if (error.response) {
    const responseData = error.response.data as IServerErrorResponse;
    console.log(responseData);
    throw new Error(
      responseData.message ? responseData.message : "An unknown error occurred"
    );
  } else if (error.request) {
    throw new Error("Network Error: No response received");
  } else {
    throw new Error("Request Error: Unable to send request");
  }
};

export default handleAxiosError;
