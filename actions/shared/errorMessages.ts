import { ErrorCodeEnum, type ErrorMessageType } from "@/types/shared";

export const commentErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ደብዳቤው ርዕሰ ጉዳይ፣ ይዘት እና ቢያንስ አንድ ተቀባይ እንዳለው ያረጋግጡ። ለመቀጠል ሁሉም ያስፈልጋሉ።",
};
