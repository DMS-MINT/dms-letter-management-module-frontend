import { ErrorCodeEnum, ErrorMessageType } from "@/types/shared";

export const notificationErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.NOTIFICATION_NOT_FOUND]: "ማስታወቂያ አልተገኘም። እባክዎ ድጋፍን ያግኙ።",
	[ErrorCodeEnum.NOTIFICATION_FAILED]: "ማስታወቂያን ማቅረብ አልተቻለም። እባክዎ እንደገና ይሞክሩ።",
	[ErrorCodeEnum.INVALID_NOTIFICATION_DATA]:
		"የማስታወቂያ መረጃ ስህተት አለበት። እባክዎ መረጃውን ያስተካክሉ።",
	[ErrorCodeEnum.BAD_REQUEST]: "በመተግበሪያ ላይ የተከሰተ ጥንቃቄ ችግር። እባክዎ መረጃዎን ያስተካክሉ።",
	[ErrorCodeEnum.FORBIDDEN]: "ይህን ተግባር ለማከናወን ቅናሽ የለዎትም።",
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]: "የውስጥ ስህተት አስከተለ። እባክዎ እንደገና ይሞክሩ።",
};
