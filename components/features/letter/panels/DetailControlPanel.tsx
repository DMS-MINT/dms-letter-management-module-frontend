"use client";

import { useAppSelector } from "@/lib/hooks";
import {
	selectLetterDetails,
	selectStatus,
} from "@/lib/features/letter/letterSlice";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../miscellaneous/ActionButtons";
import { useEffect, useState } from "react";
import { RequestStatusEnum } from "@/typing/enum";
import PrintPreviewButton from "../print/PrintPreviewButton";
import StatusBadge from "../miscellaneous/StatusBadge";
import { SubmitLetterDialog } from "../Dialogs";
import { IPermissionsInputSerializer } from "@/typing/interface";
import { LetterDetailResponseType } from "@/app/(root)/(letter management module)/letters/[category]/[referenceNumber]/page";

interface IContentJson {
	content: string;
}

export default function DetailControlPanel<T>({
	data,
}: {
	data: LetterDetailResponseType;
}) {
	const letterDetails = useAppSelector(selectLetterDetails);
	const status = useAppSelector(selectStatus);
	const [contentJson, setContentJson] = useState<IContentJson[]>([]);
	const [myPerms, setMyPerms] = useState<Array<string>>([]);

	useEffect(() => {
		const my_perms = data.permissions.filter(
			(perms) => perms.is_current_user === true
		)[0].permissions;

		setMyPerms(my_perms);
	}, [data]);

	// console.log(my_perms.find((perm) => perm === "can_update_letter"));
	// console.log(my_perms.find((perm) => perm === "can_update_letterr"));
	useEffect(() => {
		setContentJson([
			{ content: letterDetails?.content ? letterDetails?.content : "" },
		]);
	}, [letterDetails]);

	return (
		<section className="flex items-center justify-between w-full">
			letterDetails?.subject ? (
			<h1 className="page-title limited-chars ">{letterDetails?.subject}</h1>) : (
			<h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>)
			<div className="flex items-center ml-auto gap-2">
				<SubmitLetterDialog />
				<PrintPreviewButton />
				<ActionButtons />
			</div>
		</section>
	);
}
