"use client";

import { Button } from "@/components/ui/button";
import { letterCategoryTranslations } from "@/types/letter_module";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const whitelist: string[] = [
	"inbox",
	"outbox",
	"draft",
	"pending",
	"published",
	"trash",
];

export default function TableControlPanel() {
	const params = useParams();
	const router = useRouter();
	const category: string = params.category as string;

	const isValidCategory = useMemo(
		() => whitelist.includes(category),
		[category]
	);

	const categoryTitle = useMemo(
		() => letterCategoryTranslations[category.toUpperCase()],
		[category]
	);

	useEffect(() => {
		if (!isValidCategory) {
			router.push("/404");
		}
	}, [isValidCategory, router]);

	return (
		<section className="flex w-full items-center justify-between">
			<h1 className="page-title">{categoryTitle}</h1>
			<div className="flex items-center gap-4">
				<Link href="/letters/compose">
					<Button className="flex w-fit items-center gap-1">
						<Plus size={19} />
						አዲስ ደብዳቤ
					</Button>
				</Link>
			</div>
		</section>
	);
}
