import { ErrorCodeEnum, ErrorMessageType } from "@/types/shared";

export const authErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ኢሜልዎን እና የይለፍ ቃልዎን ያረጋግጡ እና እንደገና ይሞክሩ።",
};
