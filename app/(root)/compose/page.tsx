"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InternalLetterForm,
  IncomingLetterForm,
  OutgoingLetterForm,
} from "@/widgets/compose/composeForms";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  resetLetterDetail,
  setLetterType,
} from "@/lib/features/letter/letterSlice";
import { getContacts } from "@/lib/features/contact/contactSlice";

export default function Compose() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts({}));
  }, []);

  return (
    <Tabs defaultValue="internal letter form" className="h-full flex flex-col">
      <TabsList className="w-fit">
        <TabsTrigger
          value="internal letter form"
          onClick={() => {
            dispatch(resetLetterDetail());
            dispatch(setLetterType("internal"));
          }}
        >
          የውስጥ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="outgoing letter form"
          onClick={() => {
            dispatch(resetLetterDetail());
            dispatch(setLetterType("outgoing"));
          }}
        >
          ወደ ውጪ የሚላክ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="incoming letter form"
          onClick={() => {
            dispatch(resetLetterDetail());
            dispatch(setLetterType("incoming"));
          }}
        >
          ከውጭ የተላከ ደብዳቤ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="internal letter form" className="flex-1">
        <InternalLetterForm />
      </TabsContent>
      <TabsContent value="incoming letter form" className="flex-1">
        <IncomingLetterForm />
      </TabsContent>
      <TabsContent value="outgoing letter form" className="flex-1">
        <OutgoingLetterForm />
      </TabsContent>
    </Tabs>
  );
}
