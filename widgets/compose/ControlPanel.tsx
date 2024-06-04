/** @format */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Dot } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { IOption, ParticipantRolesEnum, LetterStatusEnum } from "@/typing";
import { useEffect, useState } from "react";
import { resetLetterDetail } from "@/lib/features/letter/letterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { contactToOption } from "@/utils";
import { SelectableInput } from "@/components/shared";

interface Participant {
  role: number;
  user:
    | { id: string; user_type: "member" }
    | { name: string; user_type: "guest" };
}
export default function ControlPanel() {
  const [options, setOptions] = useState<IOption[]>([]);
  const contacts = useAppSelector(selectContacts);

  useEffect(() => {
    dispatch(resetLetterDetail());
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex gap-2">
        <h1 className="page-title">አዲስ ደብዳቤ </h1>
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 "
        >
          <Dot /> አልተቀመጠም
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/letters/print">
          <Button variant="outline" size="icon">
            <Printer size={20} />
          </Button>
        </Link>
        <Button
          className="mr-0 RECIPIENTborder-gray-300 rounded-md"
          variant="outline"
          onClick={() => {
            // dispatch(setLetterStatus(LetterStatusEnum.DRAFT));
          }}
        >
          ረቂቁን ያስቀምጡ
        </Button>

        <Dialog>
          <DialogTrigger>
            <Button
              className="ml-0 border-gray-300 rounded-md"
              variant="outline"
            >
              ደብዳቤውን ምራ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <section className="flex flex-col gap-5 mx-8">
                  {" "}
                  <h2 className="font-semibold text-lg">የ ደብዳቤ መምሪያ</h2>
                  <div className="grid gap-5">
                    <div className="grid items-center gap-1.5">
                      <Label>ለ</Label>

                      <SelectableInput
                        options={options}
                        role={ParticipantRolesEnum["Draft Reviewer"]}
                        isCreatable={false}
                        isMulti={true}
                      />
                    </div>
                    <div className="grid items-center gap-1.5"></div>
                    <Label htmlFor="የተቀባይ ስም">መልክት ማስቀመጫ</Label>
                    <Textarea id="ደብዳቤ" className="bg-gray-100 h-[100px]" />
                  </div>
                  <Label htmlFor="የተቀባይ ስም" className="mt-7">
                    ፊርማ
                  </Label>
                  <section className="flex flex-col justify-center items-center cursor-pointer hover:backdrop-brightness-95 w-[410px] h-[200px] mt-0 mb-3 bg-gray-100">
                    <p className="text-center text-gray-600">
                      እባክዎን የፊርማ ሰሌዳውን እዚህ ጠቅ ያድርጉ ፊርማዎን ለማስገባት
                      <br /> ወይም
                    </p>
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="outline"
                    >
                      ቀድሞ የተቀዳ ፊርማ ይጠቀሙ
                    </Button>
                  </section>
                  <div className="flex justify-end">
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="outline"
                    >
                      ሰርዝ
                    </Button>
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="default"
                    >
                      ምራ
                    </Button>
                  </div>
                </section>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <Button variant="default">
            <DialogTrigger>ላክ</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ያረጋግጡ</DialogTitle>
              <DialogDescription>
                እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  // dispatch(setLetterStatus(LetterStatusEnum.PENDING_APPROVAL));
                }}
              >
                አዎ
              </Button>
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
    </section>
  );
}
