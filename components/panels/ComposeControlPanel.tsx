"use client";

import { createLetter } from "@/actions/letter_module/crudActions";
import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks";
import { selectNewLetter } from "@/lib/features/letterSlice";
import type { LetterDetailType } from "@/types/letter_module";
import { Tooltip } from "@radix-ui/react-tooltip";
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

	const validateFields = () => {
		if (!newLetter.participants) {
			toast.error("እባክዎ ሁሉንም ዝርዝሮች ይሙሉ።");
			return false;
		}
		return true;
	};

	const onSubmit = () => {
		if (validateFields()) {
			mutate();
		}
	};

	return (
		<section className="sticky top-0 flex w-full items-center justify-between bg-gray-100 p-4">
			<div className="flex items-center gap-4">
				<h1 className="text-xl font-semibold">አዲስ ደብዳቤ</h1>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="rounded-md border-gray-300 px-4 py-2 text-sm font-medium"
							variant="outline"
							onClick={onSubmit}
						>
							ረቂቁን ያስቀምጡ
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>ረቂቁን ያስቀምጡ</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</section>
	);
}
