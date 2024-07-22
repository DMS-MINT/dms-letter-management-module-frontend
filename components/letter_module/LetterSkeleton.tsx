import { Skeleton } from "@/components/ui/skeleton";

export default function LetterSkeleton() {
	return (
		<main className="px-5 pt-2 flex flex-col h-full">
			<Skeleton className="h-14" />
			<section className="flex gap-6 my-2 flex-1">
				<Skeleton className="w-44 h-full" />
				<Skeleton className="h-full w-full" />
			</section>
		</main>
	);
}
