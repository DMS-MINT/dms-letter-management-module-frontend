import { Skeleton } from "@/components/ui/skeleton";

export default function LetterSkeleton() {
	return (
		<main className="flex h-full flex-col px-5 pt-2">
			<Skeleton className="h-14" />
			<section className="my-2 flex flex-1 gap-6">
				<Skeleton className="h-full w-44" />
				<Skeleton className="h-full w-full" />
			</section>
		</main>
	);
}
