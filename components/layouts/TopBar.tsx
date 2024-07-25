"use client";

import Image from "next/image";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import Link from "next/link";
import { UserProfileMenu } from "../user_module";
import { IMAGES } from "@/constants";
import { letterCategoryTranslations } from "@/types/letter_module";

export default function TopBar() {
	const params = useParams();

	return (
		<header className="min-h-14 w-full px-5 bg-white flex justify-between items-center">
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
								<BreadcrumbPage>{params.referenceNumber}</BreadcrumbPage>
							</BreadcrumbItem>
						) : null}
					</BreadcrumbList>
				</Breadcrumb>
			</button>
			<div className="flex gap-4 items-center">
				<UserProfileMenu />
			</div>
		</header>
	);
}
