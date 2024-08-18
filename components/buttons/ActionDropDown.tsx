"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlarmClock, Ellipsis } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { PingNotificationModal } from "../dialogs/PingNotificationModal";
import { Button } from "../ui/button";

type Props = {
	current_state: string;
};

function ActionDropDown({ current_state }: Props) {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const handleClick = useCallback(() => {
		setIsDialogOpen((prev) => !prev);
	}, []);

	return (
		<>
			<PingNotificationModal
				open={isDialogOpen}
				handleClick={handleClick}
				current_state={current_state}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"icon"} variant={"outline"}>
						<Ellipsis size={20} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-7 min-w-[15rem] max-w-[15rem]">
					<DropdownMenuLabel>ተጨማሪ አማራጮች</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleClick}>
						<AlarmClock size={20} className="mr-2" />
						<span>ማስታወሻ ማዋቀሪያ</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

export default memo(ActionDropDown);
