"use client";
import { selectIsDrawerOpen } from "@/lib/features/ui/uiManagerSlice";
import { useAppSelector } from "@/lib/hooks";

export default function Drawer({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const isDrawerOpen = useAppSelector(selectIsDrawerOpen);

	return isDrawerOpen ? <aside className="w-44">{children}</aside> : null;
}
