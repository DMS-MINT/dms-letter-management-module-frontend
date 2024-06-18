/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Archive, FileText, Inbox, Send, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLetters, selectLetters } from "@/lib/features/letter/letterSlice";
import { useEffect } from "react";

interface IRoute {
  name: string;
  icon: JSX.Element;
  showBadge: boolean;
  path: string;
  count: number | null;
}
const icon_size: number = 20;
const icon_color: string = "#2DA4FF";

const primaryRoutes: IRoute[] = [
  {
    name: "ገቢ ደብዳቤዎች",
    icon: <Inbox size={icon_size} color={icon_color} />,
    showBadge: true,
    path: "/letters/inbox",
    count: 10,
  },
  {
    name: "የተላኩ ደብዳቤዎች",
    icon: <Send size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/outbox",
    count: null,
  },
  {
    name: "ረቂቆች",
    icon: <FileText size={icon_size} color={icon_color} />,
    showBadge: true,
    path: "/letters/draft",
    count: 3,
  },
  {
    name: "ማህደር",
    icon: <Archive size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/archive",
    count: null,
  },
  {
    name: "መጣያ",
    icon: <Trash size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/trash",
    count: null,
  },
];

export default function LetterNavigationDrawer() {
  const pathname = usePathname();
  const letters = useAppSelector(selectLetters);

  return (
    <nav className='flex flex-col gap-2 w-full no-print'>
      {primaryRoutes.map(({ name, icon, showBadge, path }) => (
        <Link key={uuidv4()} href={path}>
          <Button
            className={`flex gap-2 text-gray-900 w-full hover:bg-gray-200 justify-start ${
              path === pathname ? "bg-gray-200" : "bg-transparent"
            }`}
          >
            {icon}
            {name}
            {showBadge ? (
              <Badge
                className='ml-auto hover:bg-gray-200 bg-gray-200'
                variant='secondary'
              >
                {letters.length}
              </Badge>
            ) : null}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
