"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookDashed, FileText, Inbox, Send, BookCheck } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectLetters } from "@/lib/features/letter/letterSlice";
import { useEffect, useState } from "react";
import { selectMe } from "@/lib/features/authentication/authSlice";
import { Button } from "@/components/ui/button";

interface IRoute {
  name: string;
  icon: JSX.Element;
  showBadge: boolean;
  path: string;
  count: number | null;
  isVisible: boolean;
}
const icon_size: number = 20;
const icon_color: string = "#2DA4FF";

export default function LetterNavigationDrawer() {
  const pathname = usePathname();
  const letters = useAppSelector(selectLetters);
  const me = useAppSelector(selectMe);
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    const primaryRoutes: IRoute[] = [
      {
        name: "ገቢ ደብዳቤዎች",
        icon: <Inbox size={icon_size} color={icon_color} />,
        showBadge: false,
        path: "/letters/inbox",
        count: 10,
        isVisible: true,
      },
      {
        name: "የተላኩ ደብዳቤዎች",
        icon: <Send size={icon_size} color={icon_color} />,
        showBadge: false,
        path: "/letters/outbox",
        count: null,
        isVisible: true,
      },
      {
        name: "ረቂቆች",
        icon: <FileText size={icon_size} color={icon_color} />,
        showBadge: false,
        path: "/letters/draft",
        count: 3,
        isVisible: true,
      },
      {
        name: "መጽደቅን በመጠባበቅ ላይ",
        icon: <BookDashed size={icon_size} color={"#FF5733"} />,
        showBadge: false,
        path: "/letters/pending",
        count: null,
        isVisible: me?.is_staff,
      },
      {
        name: "የታተሙ ደብዳቤዎች",
        icon: <BookCheck size={icon_size} color={"#50C878"} />,
        showBadge: false,
        path: "/letters/published",
        count: null,
        isVisible: me?.is_staff,
      },
    ];

    setRoutes(primaryRoutes);
  }, [me]);

  return (
    <nav className="flex flex-col gap-2 w-full">
      {routes
        .filter((route) => route.isVisible === true)
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
