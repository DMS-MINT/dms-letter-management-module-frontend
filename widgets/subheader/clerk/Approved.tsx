import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot, Printer } from "lucide-react";
import React from "react";
import controlpanel from "../controlpanel";
import StatusEnum from "@/typing/enum/StatusEnum";
export default function approved() {
  return (
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
