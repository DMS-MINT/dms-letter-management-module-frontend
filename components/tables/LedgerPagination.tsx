import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface LedgerPaginationProps {
	pageIndex: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (newPage: number, newSize?: number) => void;
}

export default function LedgerPagination({
	pageIndex,
	pageSize,
	totalItems,
	onPageChange,
}: LedgerPaginationProps) {
	const totalPages = Math.ceil(totalItems / pageSize);
	const canPreviousPage = pageIndex > 0;
	const canNextPage = pageIndex < totalPages - 1;

	return (
		<div className="flex items-center justify-between px-2 text-gray-900">
			<div className="flex-1 text-sm text-muted-foreground">
				{totalItems} ረድፍ(ዎች) ሁሉም
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">ረድፎች በገጽ</p>
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => onPageChange(0, Number(value))}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					ገጽ {pageIndex + 1} ከ {totalPages}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => onPageChange(0)}
						disabled={!canPreviousPage}
					>
						<span className="sr-only">ወደ መጀመሪያ ገጽ ሂድ</span>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => onPageChange(pageIndex - 1)}
						disabled={!canPreviousPage}
					>
						<span className="sr-only">ወደ ቀዳሚው ገጽ ሂድ</span>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => onPageChange(pageIndex + 1)}
						disabled={!canNextPage}
					>
						<span className="sr-only">ወደ ቀጣዩ ገጽ ሂድ</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => onPageChange(totalPages - 1)}
						disabled={!canNextPage}
					>
						<span className="sr-only">ወደ መጨረሻው ገጽ ሂድ</span>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
