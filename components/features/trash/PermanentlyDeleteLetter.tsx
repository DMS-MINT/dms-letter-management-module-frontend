"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	removeFromTrash,
	selectLetterDetails,
} from "@/lib/features/letter/letterSlice";
import { useRouter } from "next/navigation";

export default function PermanentlyDeleteLetter() {
	const letterDetails = useAppSelector(selectLetterDetails);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleRemoveClick = () => {
		dispatch(removeFromTrash(letterDetails.reference_number));
		router.push("/letters/draft/");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"destructive"}>በቋሚነት ያስወግዱ</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col bg-white p-4 rounded-md shadow-lg">
				<DialogHeader className="flex-1 p-2">
					<DialogTitle className="text-lg font-medium">ደብዳቤውን በቋሚነት አጥፋ</DialogTitle>
					<DialogDescription>
						እርግጠኛ ነዎት ይህን ደብዳቤ እስከመጨረሻው መሰረዝ ይፈልጋሉ?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="">
					<DialogClose asChild>
						<Button variant={"outline"}>አይ</Button>
					</DialogClose>
					<Button variant={"default"} onClick={handleRemoveClick}>
						አዎ
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
