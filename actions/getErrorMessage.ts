import { ErrorCodeEnum, ErrorMessageType } from "@/types/shared";

const DEFAULT_MESSAGE: string =
	"ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ። ችግሩ ከቀጠለ፣ እባክዎ ድጋፍን ያግኙ።";

export default function getErrorMessage(
	errorMessages: ErrorMessageType,
	error: any
): string {
	if (!error.response || !error.response.data) {
		if (error.message.includes("ECONNREFUSED")) {
			return "ከሰርቨሩ ጋር መገናኘት አልተቻለም።";
		}
		return error.message || DEFAULT_MESSAGE;
	}

	const error_code = error.response.data.error_code as ErrorCodeEnum;

	console.log(error_code);
	console.log(error.response.data);

	return errorMessages[error_code] || DEFAULT_MESSAGE;
}
