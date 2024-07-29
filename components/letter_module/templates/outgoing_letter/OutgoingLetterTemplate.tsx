"use client";

import { Button } from "@/components/ui/button";
import type { LetterDetailType } from "@/types/letter_module";
import { Plus } from "lucide-react";
import { useState } from "react";
import CoverPage from "./CoverPage";
import SubsequentPage from "./SubsequentPage";

export default function OutgoingLetterTemplate({
	letter,
}: {
	letter: LetterDetailType;
}) {
	const [pageCount, setPageCount] = useState(0);

	return (
		<section className="flex flex-col items-center gap-5 py-2">
			<CoverPage letter={letter} />

			{Array.from({ length: pageCount }).map((_, index) => (
				<SubsequentPage key={index} />
			))}
			<Button
				variant={"outline"}
				className="w-[797px]"
				onClick={() => setPageCount(pageCount + 1)}
			>
				<Plus size={20} />
			</Button>
		</section>
	);
}
