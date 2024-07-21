export default function getErrorMessage(error: any): string {
	if (error.message.includes("ECONNREFUSED")) {
		return "ከሰርቨሩ ጋር መገናኘት አልተቻለም።";
	} else if (error.message.includes("401")) {
		return "እባክዎ ኢሜልዎን እና የይለፍ ቃልዎን ያረጋግጡ እና እንደገና ይሞክሩ።";
	} else if (error.message.includes("404")) {
		return error.message;
	} else if (error.message.includes("500")) {
		return "የኢንተርኔት አገልግሎት ችግር አለ። እባክዎ እንደገና ይሞክሩ።";
	}
	return "An unexpected error occurred. Please try again.";
}
