"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/lib/hooks";
import {
  resetLetterDetail,
  setLetterType,
} from "@/lib/features/letter/letterSlice";
import { LetterComposeForm } from "@/components/features/letter";
import { LetterType } from "@/typing/interface";
import { letterTypeLookup } from "@/typing/dictionary";
import { useEffect } from "react";

const composeTabs: LetterType[] = ["internal", "incoming", "outgoing"];

export default function Compose() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLetterDetail());
  }, []);

  return (
    <Tabs defaultValue="internal" className="h-full flex flex-col">
      <TabsList className="w-fit">
        {composeTabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={() => {
              dispatch(resetLetterDetail());
              dispatch(setLetterType(tab));
            }}
          >
            {letterTypeLookup[tab.toUpperCase()]}
          </TabsTrigger>
        ))}
      </TabsList>

      {composeTabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="flex-1">
          <LetterComposeForm />
        </TabsContent>
      ))}
    </Tabs>
  );
}
