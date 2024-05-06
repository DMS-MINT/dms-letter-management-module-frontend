import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
          {/* የውስጥ ደብዳቤ */}
          ወደ ውጪ የሚላክ ደብዳቤ
        </Badge>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-gray-600" />
          <p className="text-gray-600">1</p>
        </div>
      </div>
    </section>
  );
}
