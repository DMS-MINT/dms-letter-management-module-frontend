"use client";

import { Bell, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { PingNotificationModal } from "../dialogs/PingNotificationModal";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export default function ActionDropDown() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<>
			<Popover>
				<PopoverTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button variant={"outline"} size={"sm"}>
									<EllipsisVertical size={15} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom" align="center">
								<p>ተጨማሪ</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</PopoverTrigger>
				<PopoverContent className="flex w-[140px] flex-col gap-1 px-1">
					<p className="text-center text-sm">ተጨማሪ</p>
					<Separator />
					<Button
						variant={"ghost"}
						size={"sm"}
						className="flex items-center gap-2 text-sm"
						onClick={handleOpenModal}
					>
						<Bell size={15} className="text-green-500" />
						ማሳወቂያ ላክ
					</Button>
				</PopoverContent>
			</Popover>

			<PingNotificationModal open={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}
