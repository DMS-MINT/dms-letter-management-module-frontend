"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMAGES } from "@/constants";
import { letterCategoryTranslations as letterCategoryTranslationsData } from "@/types/letter_module";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProfileMenu } from "../menu";

type LetterCategoryTranslations = {
	[key: string]: string;
};

interface Params {
	category?: string;
	referenceNumber?: string;
}

const letterCategoryTranslations: LetterCategoryTranslations =
	letterCategoryTranslationsData;

export default function TopBar() {
	const params = useParams() as Params;
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<header className="flex min-h-14 w-full items-center justify-between bg-white px-5">
			<div className="flex items-center gap-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/letters/inbox">
								<button className="flex items-center gap-4 rounded-lg p-2 transition duration-100 ease-in-out hover:scale-105 hover:bg-blue-100 hover:shadow-md">
									<Image
										src={IMAGES.mint_logo}
										alt="Ministry of Innovation and Technology logo"
										width={40}
										height={40}
										priority
										className="transition-transform duration-300 ease-in-out"
									/>
								</button>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>ገቢ ደብዳቤዎች</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{isClient && (
					<Breadcrumb>
						<BreadcrumbList>
							{params.category ? (
								<>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href={`/letters/${params.category}`}>
											{letterCategoryTranslations[params.category.toUpperCase()]}
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							) : (
								<>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href={`/letters/inbox`}>ደብዳቤዎች</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							)}
							{params.referenceNumber ? (
								<BreadcrumbItem>
									<BreadcrumbPage>{params.referenceNumber}</BreadcrumbPage>
								</BreadcrumbItem>
							) : null}
						</BreadcrumbList>
					</Breadcrumb>
				)}
			</div>

			<div className="flex items-center gap-4">
				<UserProfileMenu />
			</div>
		</header>
	);
}
