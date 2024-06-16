import { IServerErrorResponse } from "@/typing/interface";
import { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError): never => {
  if (error.response) {
    const responseData = error.response.data as IServerErrorResponse;
    if (
      responseData.message === "Validation error" &&
      // @ts-ignore
      responseData.extra?.fields?.length
    ) {
      // @ts-ignore
      const [fieldWithError] = responseData.extra.fields[0]
        .split(": ")
        .slice(1);
      const errorMessage = `Validation error for ${fieldWithError}`;
      throw new Error(errorMessage);
    } else {
      const serverErrorMessage: string =
        responseData.message || "An unknown error occurred";
      throw new Error(serverErrorMessage);
    }
  } else if (error.request) {
    throw new Error("Network Error: No response received");
  } else {
    throw new Error("Request Error: Unable to send request");
  }
};

export default handleAxiosError;
