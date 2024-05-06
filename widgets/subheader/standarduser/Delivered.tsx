import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot, Printer } from "lucide-react";
import React from "react";
import controlpanel from "../controlpanel";
import StatusEnum from "@/typing/enum/StatusEnum";
export default function delivered() {
  return (
    <div className="flex items-center flex-1 ml-2 gap-2">
      <Badge
        variant="delivered"
        className="rounded-md flex items-center justify-between pl-0 mr-auto"
      >
        <Dot /> {StatusEnum.DELIVERED}
      </Badge>

      {/* {common} */}
      <Button variant="outline" size="icon">
        <ChevronLeft size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <Printer size={20} />
      </Button>
      <Button variant="outline">ሰርዝ</Button>
    </div>
  );
}
