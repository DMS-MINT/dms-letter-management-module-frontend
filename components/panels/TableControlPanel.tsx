"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDraftLetterStore, useUserStore } from "@/lib/stores";
import { letterCategoryTranslations } from "@/types/letter_module";
import { Plus } from "lucide-react";
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

	const updateLetterField = useDraftLetterStore(
		(state) => state.updateLetterField
	);
	const is_staff = useUserStore(
		(state) => state.currentUser.users_permissions.is_staff
	);

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

	const handleClick = (type: string): void => {
		updateLetterField("letter_type", type);
		router.push("/letters/compose");
	};

	return (
		<section className="flex w-full items-center justify-between">
			<h1 className="page-title">{categoryTitle}</h1>
			<div className="flex items-center gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="flex w-fit items-center gap-1">
							<Plus size={19} />
							አዲስ ደብዳቤ
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleClick("internal")}>
							የውስጥ ደብዳቤ
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleClick("outgoing")}>
							ወደ ውጪ የሚላክ ደብዳቤ
						</DropdownMenuItem>
						{is_staff ? (
							<DropdownMenuItem onClick={() => handleClick("incoming")}>
								ከውጭ የተላከ ደብዳቤ
							</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</section>
	);
}
