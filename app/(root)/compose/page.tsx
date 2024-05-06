import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InternalLetterForm,
  IncomingLetterForm,
  OutgoingLetterForm,
} from "@/widgets/compose/composeForms";

export default function Compose() {
  return (
    <Tabs defaultValue="internal letter form" className="h-full flex flex-col">
      <TabsList className="w-fit">
        <TabsTrigger value="internal letter form">የውስጥ ደብዳቤ</TabsTrigger>
        <TabsTrigger value="outgoing letter form">ወደ ውጪ የሚላክ ደብዳቤ</TabsTrigger>
        <TabsTrigger value="incoming letter form">ከውጭ የተላከ ደብዳቤ</TabsTrigger>
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
