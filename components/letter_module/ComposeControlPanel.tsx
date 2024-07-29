"use client";

import { createLetter } from "@/actions/letter_module/crudActions";
import { useAppSelector } from "@/hooks";
import { selectNewLetter } from "@/lib/features/letterSlice";
import type { LetterDetailType } from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ComposeControlPanel() {
	const newLetter = useAppSelector(selectNewLetter);
	const router = useRouter();
	const { mutate } = useMutation({
		mutationKey: ["createLetter"],
		mutationFn: async () => {
			const response = await createLetter(newLetter);

			if (!response.ok) throw response;

			return response.message as LetterDetailType;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ደብዳቤ በመፍጠር ላይ፣ እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success("ደብዳቤ በተሳካ ሁኔታ ተፈጥሯል!");
			router.push(`/letters/draft/${data.reference_number}`);
			console.log(data);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const onSubmit = () => {
		mutate();
	};

	return (
		<section className="sticky top-0 flex w-full items-center justify-between">
			<div className="flex gap-2">
				<h1 className="page-title">አዲስ ደብዳቤ </h1>
			</div>
			<Button
				className="RECIPIENTborder-gray-300 mr-0 rounded-md"
				variant="outline"
				onClick={onSubmit}
			>
				ረቂቁን ያስቀምጡ
			</Button>
		</section>
	);
}
