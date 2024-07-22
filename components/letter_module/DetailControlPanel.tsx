"use client";
import { useEffect, useState } from "react";
import { LetterDetailResponseType } from "@/types/letter_module";
import { SubmitLetterDialog, ActionButtons } from ".";

interface IContentJson {
	content: string;
}

export default function DetailControlPanel<T>({
	data,
}: {
	data: LetterDetailResponseType;
}) {
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
	// useEffect(() => {
	// 	setContentJson([
	// 		{ content: letterDetails?.content ? letterDetails?.content : "" },
	// 	]);
	// }, [letterDetails]);

	return (
		<section className="flex items-center justify-between w-full">
			letter.subject ? (
			<h1 className="page-title limited-chars ">{data.letter.subject}</h1>) : (
			<h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>)
			<div className="flex items-center ml-auto gap-2">
				<SubmitLetterDialog />
				{/* <PrintPreviewButton /> */}
				<ActionButtons data={data} />
			</div>
		</section>
	);
}
