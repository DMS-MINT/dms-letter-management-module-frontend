/** @format */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Mail,
  MessageSquare,
  Paperclip,
  Share2,
} from "lucide-react";

export default function Aside() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-gray-600" />
          <p className="text-gray-600">የደብዳቤ አይነት</p>
        </div>
        <Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal">
          የውስጥ ደብዳቤ
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-8">
          <Paperclip strokeWidth={0.75} />
          <p className="text-gray-600">የተያያዙ ፋይሎች</p>
        </div>
        <div className="flex items-center gap-2 ">
          <Share2 size={20} className="text-gray-600" />
          <p className="text-gray-600">ግልባጭ ያላቸው ሰዎች</p>
        </div>
        <div className="mb-8">
          <Avatar className="bg-green-900 md:text-green-600 font-size-sm">
            <AvatarFallback>ዲኢ</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2 ">
          <Share2 size={20} className="text-gray-600" />
          <p className="text-gray-600">እንዲያውቁት</p>
        </div>
        <div className="mb-10">
          <Avatar className="bg-green-900 md:text-green-600">
            <AvatarFallback>አማ</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <p>1</p>
          <MessageSquare size={30} strokeWidth={1}>
            {" "}
            1
          </MessageSquare>
        </div>
      </div>
    </section>
  );
}
