"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores";
import { Menu } from "lucide-react";

export default function Subheader({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const toggleDrawerVisibility = useUiStore(
		(store) => store.toggleDrawerVisibility
	);

	return (
		<section className="flex items-center bg-gray-50 px-5 py-2">
			<Button variant="ghost" size="icon" onClick={toggleDrawerVisibility}>
				<Menu className="h-6 w-6" />
			</Button>
			{children}
		</section>
	);
}
