// /** @format */

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Dot,
//   EllipsisIcon,
//   Printer,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export default function ControlPanel() {
//   return (
//     <section className='flex items-center justify-between w-full'>
//       <h1 className='page-title justify-start'> የሆቴል አገልግሎት ግዢን ይመለከታል </h1>
//       {/* <Badge
//         variant='destructive'
//         className='rounded-md px-0 mr-0  px-0!important justify-start'
//       >
//         <Dot className='justify-end' /> ረቂቅ
//       </Badge> */}
//       <div className='flex items-center gap-2 '>
//         <Button variant='outline' size='icon'>
//           <ChevronLeft strokeWidth={1} size={20} />
//         </Button>
//         <Button variant='outline' size='icon'>
//           <ChevronRight strokeWidth={1} size={20} />
//         </Button>
//         <div className='ml-1'>
//           <Printer strokeWidth={1.2} />
//         </div>
//         {/* <DropdownMenu>
//           <DropdownMenuTrigger className='outline-none inline-flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 h-10 w-10'>
//             <EllipsisIcon size={20} />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className='text-gray-900'>
//             <DropdownMenuItem>ደብዳቤውን አትም</DropdownMenuItem>
//             <DropdownMenuItem>ደብዳቤውን አዘጋጅ</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>ዳግም ጫን</DropdownMenuItem>
//             <DropdownMenuItem>ሰርዝ</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Hide Sidebar</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu> */}
//         <div className='ml-3 rounded-md bg-blue-500 hover:bg-blue-800 px-3 py-2'>
// <Dialog>
//   <DialogTrigger>ያስገቡ</DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>ያረጋግጡ</DialogTitle>
//       <DialogDescription>
//         እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
//       </DialogDescription>
//     </DialogHeader>
//     <DialogFooter>
//       <Button type='submit'>አዎ</Button>
//       <Button
//         className='bg-white text-black hover:bg-white'
//         type='submit'
//       >
//         አይ
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserTypeEnum } from "@/typing/enum";
import {
  ChevronLeft,
  ChevronRight,
  Dot,
  Plus,
  Printer,
  RotateCw,
} from "lucide-react";
import Link from "next/link";

import StatusEnum from "@/typing/enum/StatusEnum";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface IPanel {
  edited: boolean;
  status: StatusEnum;
  userType: UserTypeEnum;
}
export default function ControlPanel() {
  function refreshPage() {
    window.location.reload();
  }

  const currentPanelStatus: IPanel = {
    edited: false,
    status: StatusEnum.PENDING,
    userType: UserTypeEnum.CLERK,
  };
  const common: React.ReactNode = (
    <>
      <Button variant="outline" size="icon">
        <ChevronLeft size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <Printer size={20} />
      </Button>
    </>
  );
  const editPanel: React.ReactNode = currentPanelStatus.edited ? (
    <div className="flex items-center flex-1 ml-2 gap-2">
      <Badge
        variant="destructive"
        className="rounded-md flex items-center justify-between pl-0 mr-auto"
      >
        <Dot /> {StatusEnum.EDITED}
      </Badge>
      {common}
      <Button>አርም</Button>
    </div>
  ) : currentPanelStatus.userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
    currentPanelStatus.status.valueOf() === StatusEnum.DRAFT.valueOf() ? (
      <div className="flex items-center flex-1 ml-2 gap-2">
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 mr-auto"
        >
          <Dot /> {StatusEnum.DRAFT}
        </Badge>
        <Button
          variant="default"
          size="default"
          className="bg-darkgreen-400 text-darkgreen-100"
        >
          ደብዳቤዉ መድረሱን አሳውቅ
        </Button>
        {common}
        <Button>አርም</Button>
      </div>
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.APPROVED.valueOf() ? (
      <div className="flex items-center flex-1 ml-2 gap-2">
        <Badge
          variant="approved"
          className="rounded-md flex items-center justify-between pl-0 mr-auto"
        >
          <Dot /> {StatusEnum.APPROVED}
        </Badge>
        <Button variant="third" size="default">
          ደብዳቤዉ መድረሱን አሳውቅ
        </Button>
        {common}
        <Button variant="outline">ሰርዝ</Button>
      </div>
    ) : currentPanelStatus.status.valueOf() === StatusEnum.PENDING.valueOf() ? (
      <div className="flex items-center flex-1 ml-2 gap-2">
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 mr-auto"
        ></Badge>
        {common}
        <Dialog>
          <DialogTrigger>ያስገቡ</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ያረጋግጡ</DialogTitle>
              <DialogDescription>
                እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">አዎ</Button>
              <Button
                className="bg-white text-black hover:bg-white"
                type="submit"
              >
                አይ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ) : currentPanelStatus.status.valueOf() === StatusEnum.DRAFT.valueOf() ? (
      <div className="flex items-center flex-1 ml-2 gap-2">
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 mr-auto"
        >
          <Dot /> {StatusEnum.DRAFT}
        </Badge>
        <Button
          variant="default"
          size="default"
          className="bg-darkgreen-400 text-darkgreen-100"
        >
          ደብዳቤዉ መድረሱን አሳውቅ
        </Button>
        {common}
        <Button>አርም</Button>
      </div>
    ) : currentPanelStatus.status.valueOf() === StatusEnum.DRAFT.valueOf() ? (
      <div className="flex items-center flex-1 ml-2 gap-2">
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 mr-auto"
        >
          <Dot /> {StatusEnum.DRAFT}
        </Badge>
        <Button
          variant="default"
          size="default"
          className="bg-darkgreen-400 text-darkgreen-100"
        >
          ደብዳቤዉ መድረሱን አሳውቅ
        </Button>
        {common}
        <Button>አርም</Button>
      </div>
    ) : null
  ) : null;

  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">ገቢ ደብዳቤዎች</h1>
      {editPanel}
      {/* <div className="flex items-center gap-4">
        {currentPanelStatus.edited
          ? null
          : currentPanelStatus.userType
            ? currentPanelStatus.status
              ? null
              : null
            : null}

        <ForwardDialog />
        <SentDialog />
        <CancelDialog />
      </div> */}
    </section>
  );
}
