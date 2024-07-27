export enum ErrorCodeEnum {
	// Client errors
	"BAD_REQUEST" = "BAD_REQUEST", // 400
	"FORBIDDEN" = "FORBIDDEN", // 403
	"VALIDATION_ERROR" = "VALIDATION_ERROR", // 403

	// Server errors
	"BAD_RESPONSE" = "BAD_RESPONSE", // 500
	"INTERNAL_SERVER_ERROR" = "INTERNAL_SERVER_ERROR", // 500

	// Custom application errors
	"INVALID_OTP" = "INVALID_OTP", // 400
	"EMPTY_CONTENT" = "EMPTY_CONTENT", // 400
	"MISSING_ATTACHMENT" = "MISSING_ATTACHMENT", // 400
	"UNSIGNED_LETTER" = "UNSIGNED_LETTER", // 400
	"SIGNATURE_NOT_FOUND" = "SIGNATURE_NOT_FOUND", // 404
	"Letter_NOT_FOUND" = "Letter_NOT_FOUND", // 404
}

export type ErrorMessageType = Partial<Record<ErrorCodeEnum, string>>;
