import { AxiosError } from "axios";

const handleAxiosError = (error: any) => {
	const axiosError = error as AxiosError;

	let errorMessage = "An unexpected error occurred. Please try again.";

	switch (true) {
		case axiosError.message.includes("ECONNREFUSED"):
			errorMessage =
				"Unable to connect to the server. Please ensure the server is running and try again.";
			break;
		case axiosError.message.includes("401"):
			errorMessage = "Unauthorized. Please check your credentials and try again.";
			break;
		default:
			break;
	}

	return errorMessage;
};

export default handleAxiosError;
