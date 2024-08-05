"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IMAGES } from "@/constants";
import { letterCategoryTranslations } from "@/types/letter_module";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserProfileMenu } from "../menu";

export default function TopBar() {
	const params = useParams();

	return (
		<header className="flex min-h-14 w-full items-center justify-between bg-white px-5">
			<button className="flex items-center gap-4 hover:cursor-pointer">
				<Link href="/letters/compose">
					<Image
						src={IMAGES.mint_logo}
						alt="Ministry of Innovation and Technology logo"
						width={40}
						height={40}
						priority
					/>
				</Link>
				<Breadcrumb>
					<BreadcrumbList>
						{params.category ? (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href={`/letters/${params.category}`}>
										{letterCategoryTranslations[params.category.toString().toUpperCase()]}
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
								<BreadcrumbPage className="text-sm">
									{params.referenceNumber}
								</BreadcrumbPage>
							</BreadcrumbItem>
						) : null}
					</BreadcrumbList>
				</Breadcrumb>
			</button>
			<div className="flex items-center gap-4">
				<UserProfileMenu />
			</div>
		</header>
	);
}
