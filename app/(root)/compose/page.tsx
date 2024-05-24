"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setLetterType, resetState } from "@/redux/slices/composeSlice";
import {
  InternalLetterForm,
  IncomingLetterForm,
  OutgoingLetterForm,
} from "@/widgets/compose/composeForms";
import { useDispatch } from "react-redux";

export default function Compose() {
  const dispatch = useDispatch();
  return (
    <Tabs defaultValue="internal letter form" className="h-full flex flex-col">
      <TabsList className="w-fit">
        <TabsTrigger
          value="internal letter form"
          onClick={() => {
            dispatch(resetState());
            dispatch(setLetterType("internal"));
          }}
        >
          የውስጥ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="outgoing letter form"
          onClick={() => {
            dispatch(resetState());
            dispatch(setLetterType("outgoing"));
          }}
        >
          ወደ ውጪ የሚላክ ደብዳቤ
        </TabsTrigger>
        <TabsTrigger
          value="incoming letter form"
          onClick={() => {
            dispatch(resetState());
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
