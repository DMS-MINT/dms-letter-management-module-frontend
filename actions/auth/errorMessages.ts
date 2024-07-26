import { ErrorCodeEnum, ErrorMessageType } from "@/types/shared";

export const authErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ኢሜልዎን እና የይለፍ ቃልዎን ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
};
