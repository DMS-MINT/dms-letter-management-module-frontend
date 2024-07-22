import {
	PermanentlyDeleteDialog,
	ShareLetterDialog,
	SubmitLetterDialog,
} from "@/components/letter_module";
import {
	LetterDetailResponseType,
	LetterDetailType,
	PermissionsType,
} from "@/types/letter_module";
import { Trash } from "lucide-react";
import generateUserPermissions from "./generateUserPermissions";

export type ButtonConfigType = {
	isVisible: boolean;
	isButton: boolean;
	component?: JSX.Element;
	label?: string | null;
	icon?: JSX.Element;
	variant:
		| "link"
		| "default"
		| "secondary"
		| "destructive"
		| "outline"
		| "third"
		| "ghost";
	size: "default" | "sm" | "lg" | "icon";
	style: string;
	action: () => void;
};

export default function getActionButtonConfigs(
	data: LetterDetailResponseType
): ButtonConfigType[] {
	const currentUserPerms: PermissionsType = generateUserPermissions(data);
	return [
		{
			isVisible: currentUserPerms.can_trash_letter,
			isButton: true,
			variant: "outline",
			style: "",
			size: "icon",
			icon: <Trash size={20} />,
			action: () => {},

			// action: () => {
			// 	dispatch(moveToTrash(letterDetails.reference_number));
			// },
		},
		{
			isVisible: currentUserPerms.can_share_letter,
			isButton: false,
			component: <ShareLetterDialog letter={data.letter} />,
			label: "ደብዳቤውን አጋራ",
			variant: "outline",
			style: "",
			size: "default",
			action: () => {},
		},
		{
			isVisible: currentUserPerms.can_restore_letter,
			isButton: true,
			label: "ወደነበረበት መልስ",
			variant: "default",
			style: "",
			size: "default",
			action: () => {},
			// action: () => {
			// 	dispatch(restoreFromTrash(letterDetails.reference_number));
			// },
		},
		{
			isVisible: currentUserPerms.can_remove_from_trash_letter,
			isButton: false,
			component: <PermanentlyDeleteDialog letter={data.letter} />,
			label: "remove",
			variant: "outline",
			style: "",
			size: "default",
			action: () => {},
		},
		{
			isVisible: currentUserPerms.can_update_letter,
			isButton: true,
			label: "ለውጦቹን አስቀምጥ",
			variant: "outline",
			style: "",
			size: "default",
			action: () => {},
			// action: () => {
			// 	const serializedLetter = letterSerializer(
			// 		letterDetails,
			// 		attachments,
			// 		letterDetails.signature
			// 	);

			// 	dispatch(
			// 		updateLetter({
			// 			reference_number: letterDetails.reference_number,
			// 			letter: serializedLetter,
			// 		})
			// 	);

			// 	dispatch(resetAttachments());
			// },
		},
		{
			isVisible: currentUserPerms.can_submit_letter,
			isButton: false,
			component: <SubmitLetterDialog />,
			label: "ወደ መዝገብ ቢሮ አስተላልፍ",
			variant: "default",
			style: "",
			size: "default",
			action: () => {},
		},
		{
			isVisible:
				data.letter.letter_type === "incoming" &&
				currentUserPerms.can_publish_letter,
			isButton: false,
			component: <SubmitLetterDialog />,
			label: "ወደ መዝገብ ቢሮ አስተላልፍ",
			variant: "default",
			style: "",
			size: "default",
			action: () => {},
		},
		{
			isVisible: currentUserPerms.can_retract_letter,
			isButton: true,
			label: "ለክለሳ መልስ",
			variant: "destructive",
			style: "",
			size: "default",
			action: () => {
				// dispatch(retractLetter(data.letter.reference_number));
			},
		},
		{
			isVisible:
				data.letter.letter_type !== "incoming" &&
				currentUserPerms.can_reject_letter,
			isButton: true,
			label: "ደብዳቤውን አትቀበል",
			variant: "destructive",
			style: "",
			size: "default",
			action: () => {
				// dispatch(rejectLetter(letterDetails.reference_number));
				// router.push("/letters/pending/");
			},
		},
		{
			isVisible:
				data.letter.letter_type !== "incoming" &&
				currentUserPerms.can_publish_letter,
			isButton: true,
			label: "ደብዳቤውን አከፋፍል",
			variant: "third",
			style: "",
			size: "default",
			action: () => {
				// dispatch(publishLetter(letterDetails.reference_number));
			},
		},
		{
			isVisible: currentUserPerms.can_close_letter,
			isButton: true,
			label: "የደብዳቤውን የስራ ሂደት አጠናቅ",
			variant: "third",
			style: "",
			size: "default",
			action: () => {
				// dispatch(closeLetter(letterDetails.reference_number));
			},
		},
		{
			isVisible: currentUserPerms.can_reopen_letter,
			isButton: true,
			label: "የደብዳቤውን የስራ ሂደት እንደገና ክፈት",
			variant: "default",
			style: "",
			size: "default",
			action: () => {
				// dispatch(reopenLetter(letterDetails.reference_number));
			},
		},
	];
}
