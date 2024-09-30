import { ErrorCodeEnum, type ErrorMessageType } from "@/types/shared";

export const curdErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ደብዳቤው ርዕሰ ጉዳይ፣ ይዘት እና ቢያንስ አንድ ተቀባይ እንዳለው ያረጋግጡ። ለመቀጠል ሁሉም ያስፈልጋሉ።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.EMPTY_CONTENT]: "የደብዳቤው ይዘት ባዶ ሊሆን አይችልም።",
	[ErrorCodeEnum.UNSIGNED_LETTER]: "ደብዳቤው ከመቀጠልዎ በፊት መፈረም አለበት።",
	[ErrorCodeEnum.USERDEFAULTSIGNATURE_NOT_FOUND]: "ፊርማዎን ማግኘት አልተቻለም።",
	[ErrorCodeEnum.MISSING_ATTACHMENT]:
		"ምንም ዓባሪ ስለሌለው ይህን ደብዳቤ ማተም አይችሉም። እባክዎ ከማተምዎ በፊት ቢያንስ አንድ ዓባሪ ያክሉ።",
};

export const deleteErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ይቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.VALIDATION_ERROR]: "የተጠቀሰው የመዝገብ ቁጥር ያለው ደብዳቤ የለም።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.BATCH_OPERATION_FAILED]:
		"ባች ማጥፋት በከፊል አልተሳካም። አንዳንድ ደብዳቤዎች አልተወገዱም።",
};

export const workflowErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ይቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.EMPTY_CONTENT]: "የደብዳቤው ይዘት ባዶ ሊሆን አይችልም።",
	[ErrorCodeEnum.MISSING_ATTACHMENT]: "ደብዳቤው ቢያንስ አንድ አባሪ ሊኖረው ይገባል።",
	[ErrorCodeEnum.UNSIGNED_LETTER]: "ደብዳቤው ከመቀጠልዎ በፊት መፈረም አለበት።",
	[ErrorCodeEnum.USERDEFAULTSIGNATURE_NOT_FOUND]: "ፊርማዎን ማግኘት አልተቻለም።",
	[ErrorCodeEnum.Letter_NOT_FOUND]: "የተሰጠው የመዝገብ ቁጥር ያለው ደብዳቤ ሊገኝ አልቻለም።",
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ሁሉም አስፈላጊ መስኮች በትክክል መሞላታቸውን ያረጋግጡ እና እንደገና ይሞክሩ።",
};
