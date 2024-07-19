import { AxiosError } from "axios";

const handleAxiosError = (error: any) => {
	const axiosError = error as AxiosError;

	let errorMessage = "An unexpected error occurred. Please try again.";

	switch (true) {
		case axiosError.message.includes("ECONNREFUSED"):
			errorMessage =
				"ከኮምፒውተር ሰርቨሩ ጋር መገናኘት አልተቻለም።እባክዎ የኮምፒውተር ሰርቨሩ እየሰራ መሆኑን ያረጋግጡ እና እንደገና ይሞክሩ።";
			break;
		case axiosError.message.includes("401"):
			errorMessage = "እባክዎ ኢሜልዎን እና የይለፍ ቃልዎን ያረጋግጡ እና እንደገና ይሞክሩ።";
			break;
		default:
			break;
	}

	return errorMessage;
};

export default handleAxiosError;
