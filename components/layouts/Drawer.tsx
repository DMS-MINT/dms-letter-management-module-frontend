"use client";

import { useUiStore } from "@/stores";

export default function Drawer({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);

	return isDrawerOpen ? <aside className="w-44">{children}</aside> : null;
}
