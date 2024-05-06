"use client";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { primaryRoutes } from "@/routes";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [route, setRoute] = useState<string>("");
  const pathname = usePathname();
  console.log(route);
  useEffect(() => {
    const currentRoute = primaryRoutes.filter(
      (route) => route.path === pathname
    );

    setRoute((prevRoute) => {
      if (currentRoute.length === 1) {
        return currentRoute[0].name;
      } else {
        return prevRoute;
      }
    });
  }, [pathname]);
  return (
    <header className="min-h-16 w-full px-8 bg-white flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image src={Logo} alt="logo" width={30} height={30} />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/compose">{route}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4 items-center">
        {pathname !== "/compose" ? (
          <Input
            type="text"
            placeholder="ፈልግ"
            className=" w-96 py-0 focus-visible:ring-0 h-9 focus-visible:ring-offset-0"
          />
        ) : null}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>ዳገ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex">
              <DropdownMenuItem>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
