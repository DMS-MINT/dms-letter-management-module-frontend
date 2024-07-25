"use client";

import CoverPage from "./CoverPage";
import SubsequentPage from "./SubsequentPage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function OutgoingLetterTemplate() {
	const [isVisible, setIsVisible] = useState(false);
	const [pageCount, setPageCount] = useState(0);

	return (
		<section className="py-2 flex flex-col items-center gap-5">
			<CoverPage />
			{Array.from({ length: pageCount }).map((_, index) => (
				<SubsequentPage />
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
