"use client";

import React from "react";
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
import { DataLoader } from "@/components/shared";

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="min-h-16 w-full px-8 bg-white flex justify-between items-center">
      <DataLoader />
      <div className="flex items-center gap-4">
        <Image src={Logo} alt="logo" width={30} />
        {/* <Breadcrumb>
          <BreadcrumbList>
            {pathname &&
              pathname
                .split("/")
                .splice(2)
                .map((path, index) => (
                  <React.Fragment key={path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/letters/${path}`}>
                        {path}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
          </BreadcrumbList>
        </Breadcrumb> */}
      </div>
      <div className="flex gap-4 items-center">
        {pathname.split("/").splice(2)[0] !== "compose" ? (
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
              <DropdownMenuItem>ውጣ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
