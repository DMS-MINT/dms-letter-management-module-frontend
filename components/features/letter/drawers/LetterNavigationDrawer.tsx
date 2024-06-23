"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Archive,
  BookCheck,
  FileText,
  Inbox,
  MailCheckIcon,
  Send,
  Trash,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLetters, selectLetters } from "@/lib/features/letter/letterSlice";
import { useEffect } from "react";
import { selectMe } from "@/lib/features/authentication/authSlice";

interface IRoute {
  name: string;
  icon: JSX.Element;
  showBadge: boolean;
  path: string;
  count: number | null;
  is_visible: boolean;
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
    is_visible: true,
  },
  {
    name: "የተላኩ ደብዳቤዎች",
    icon: <Send size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/outbox",
    count: null,
    is_visible: true,
  },
  {
    name: "ረቂቆች",
    icon: <FileText size={icon_size} color={icon_color} />,
    showBadge: true,
    path: "/letters/draft",
    count: 3,
    is_visible: true,
  },
 
  {
    name: "በመጠባበቅ ላይ",
    icon: <MailCheckIcon size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/pending",
    count: null,
    is_visible: true,
  },
  {
    name: "አትም",
    icon: <BookCheck size={icon_size} color={icon_color} />,
    showBadge: false,
    path: "/letters/publish",
    count: null,
    is_visible: true,
  },
];

export default function LetterNavigationDrawer() {
  const pathname = usePathname();
  const letters = useAppSelector(selectLetters);

  return (
    <nav className="flex flex-col gap-2 w-full">
      {primaryRoutes
        .filter((route) => route.is_visible)
        .map(({ name, icon, showBadge, path }) => (
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
                  className="ml-auto hover:bg-gray-200 bg-gray-200"
                  variant="secondary"
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
