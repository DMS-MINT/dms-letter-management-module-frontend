"use client";

// import { getDepartments } from "@/actions/user_module/action";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useLetterRevisionStore } from "@/lib/stores";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import { LanguageEnum } from "@/types/shared";
// import type { DepartmentAbbrType } from "@/types/user_module";
// import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import { toast } from "sonner";
import { Input } from "../ui/input";
import React from "react";
export default function RefNoAndDate({
	reference_number,
	published_at,
	publishable,
}: {
	reference_number?: string;
	published_at: string;
	publishable: boolean;
}) {
	// const current_state = useLetterRevisionStore((state) => state.current_state);
	const language = useLetterRevisionStore((state) => state.language);
	const department = useLetterRevisionStore((state) => state.department);
	const year = useLetterRevisionStore((state) => state.year);
	const letter_type = useLetterRevisionStore((state) => state.letter_type);

	const updateLetterField = useLetterRevisionStore(
		(state) => state.updateLetterField
	);

	// const { isSuccess, data: departments } = useQuery({
	// 	queryKey: ["department_abbr"],
	// 	queryFn: async () => {
	// 		try {
	// 			const response = await getDepartments();

	// 			if (!response.ok) throw response;

	// 			return response.message as DepartmentAbbrType[];
	// 		} catch (error: any) {
	// 			toast.dismiss();
	// 			toast.error(error.message);
	// 		}
	// 	},
	// 	staleTime: Infinity,
	// });

	const [date, setDate] = React.useState<Date>();
	useEffect(() => {
		if (language === LanguageEnum.English) {
			updateLetterField("year", "2024");
		} else {
			updateLetterField("year", "2017");
		}
		updateLetterField("department", department);
	}, [language, department, updateLetterField]);

	const handleDateChange = (date: Date | undefined) => {
		const now = new Date();
		const dateToUse = date
			? new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate(),
					now.getHours(),
					now.getMinutes(),
					now.getSeconds()
				)
			: new Date();

		// Format the date as YYYY-MM-DDTHH:MM:SS.ssssss+00:00 (ISO format for Django)
		// const fullDateFormatted = `${dateToUse.getUTCFullYear()}-${String(dateToUse.getUTCMonth() + 1).padStart(2, "0")}-${String(dateToUse.getUTCDate()).padStart(2, "0")}T${String(dateToUse.getUTCHours()).padStart(2, "0")}:${String(dateToUse.getUTCMinutes()).padStart(2, "0")}:${String(dateToUse.getUTCSeconds()).padStart(2, "0")}.${String(dateToUse.getUTCMilliseconds()).padStart(3, "0")}000+00:00`;
		// updateLetterField("fullDate", fullDateFormatted);

		if (language === LanguageEnum.English) {
			const formattedDate = format(dateToUse, "MMMM dd, yyyy");
			updateLetterField("published_at", formattedDate);
		} else {
			// const dateString = dateToUse.toISOString();
			updateLetterField(
				"published_at",
				convertToEthiopianDate(dateToUse.toISOString())
			);
		}
		setDate(date);
	};

	return (
		<div className="my-4 mr-2 flex flex-col self-end">
			{letter_type === "incoming" ? (
								<>
								</>
							) : (
			<div className="flex">
				<span>
					<span className="block">ቁጥር</span>
					<span>Ref.No.</span>
				</span>
				<div className="mb-1.5 ml-1 flex w-52 flex-col self-end">
					{publishable ? (
						<>

								<>
									<div className="-mb-1 flex w-full flex-row gap-x-1 text-xl">
										<label>{department}</label>
										<p>-</p>
										<Input
											type="text"
											className="h-7 w-full cursor-pointer border-none bg-inherit p-0 text-center text-xl ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-1"
											onChange={(e) =>
												updateLetterField("reference_number", e.target.value)
											}
										/>
										<p>-</p>
										<label>{year}</label>
									</div>
									<div className="w-full">
										<hr className="border-black" />
									</div>
								</>
						</>
					) : (
						<>
							{published_at ? (
								<>
									<span className="text-center">{reference_number || ""}</span>
									<hr className="border-black" />
								</>
							) : (
								<div className="w-full">
									<hr className="border-black" />
								</div>
							)}
						</>
					)}
				</div>
			</div>)}

			<div className="flex">
				<span>
					<span className="block">ቀን</span>
					<span>Date</span>
				</span>
				<div className="flex w-full flex-col items-center self-end">
					{publishable ? (
						<>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-56 justify-center border-none bg-inherit p-0 text-xl ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
											!date && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? (
											format(date, "dd/MM/yyyy")
										) : language === LanguageEnum.English ? (
											<span>Pick a date</span>
										) : (
											<span>ቀን ይምረጡ</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={date}
										onSelect={(selectedDate) => {
											handleDateChange(selectedDate);
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<div className="w-full">
								<hr className="ml-0.5 border-black" />
							</div>
						</>
					) : published_at ? (
						<>
							<span className="text-center">{published_at}</span>
							<div className="mb-0.5 w-full self-end">
								<hr className="ml-0.5 border-black" />
							</div>
						</>
					) : (
						<div className="mb-0.5 w-full self-end">
							<hr className="ml-0.5 border-black" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
