"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Drawer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const drawer = useSelector((state: RootState) => state.ui.drawer);
  return drawer ? <aside className="w-56">{children}</aside> : null;
}
