"use client";
import { Button } from "@/components/ui/button";
import { toggleDrawer } from "@/redux/slices";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";

export default function Subheader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();
  return (
    <section className="flex items-center py-3 pl-5 pr-8 bg-gray-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(toggleDrawer())}
      >
        <Menu className="w-6 h-6" />
      </Button>
      {children}
    </section>
  );
}
