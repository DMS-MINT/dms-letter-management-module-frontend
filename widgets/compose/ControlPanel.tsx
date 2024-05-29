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

import TagInput from "@/components/taginput/TagInput";
import { useDispatch, useSelector } from "react-redux";
import { LetterStatusEnum, RolesEnum } from "@/typing/enum";
import { setLetterStatus } from "@/redux/slices/composeSlice";
import CreatableSelect from "react-select/creatable";
import { RootState } from "@/redux/store";
import {
  addParticipant,
  removeParticipant,
  resetState,
  updateSubject,
} from "@/redux/slices/composeSlice";

import { IUserOptions } from "@/typing";
import Select, { ActionMeta } from "react-select";
import axios from "axios";

interface Participant {
  role: number;
  user:
    | { id: string; user_type: "member" }
    | { name: string; user_type: "guest" };
}
export default function ControlPanel() {
  const { userOptions } = useSelector((state: RootState) => state.user);
  function handleChange(
    option: readonly IUserOptions[],
    actionMeta: ActionMeta<IUserOptions>
  ) {
    const { action, name, option: selectedOption, removedValue } = actionMeta;
    const role = Number(name);

    if (action === "select-option" && selectedOption) {
      const { value: id, label: name, user_type } = selectedOption;
      dispatch(addParticipant({ id, name, role, user_type }));
    } else if (action === "create-option" && selectedOption) {
      const user_type = "guest";
      const { value: id, label: name } = selectedOption;
      dispatch(addParticipant({ id, name, role, user_type }));
    } else if (action === "remove-value" && removedValue) {
      const { value: id, label: name, user_type } = removedValue;
      dispatch(removeParticipant({ id, name, role, user_type }));
    }
  }
  const letter = useSelector((state: RootState) => state.compose);
  const dispatch = useDispatch();

  interface User {
    id: string;
    user_type: "member" | "guest";
    name?: string; // Optional for guests
  }

  // interface Participant {
  //   role: number;
  //   user: User;
  // }

  interface Letter {
    subject: string;
    content: string;
    status: number;
    letter_type: string;
    participants: Participant[];
  }

  const sendLetter = async (letter: Letter) => {
    if (!letter) {
      console.error("Error: No letter object provided");
      return;
    }

    if (letter.participants.length > 0) {
      try {
        // Log the payload to inspect its structure before sending
        console.log("Sending letter:", JSON.stringify(letter, null, 2));

        // Make a POST request to your API endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/letters/create/`,
          letter,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Letter sent:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Log detailed error information if the request fails
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          } else {
            console.error("Error message:", error.message);
          }
        } else {
          console.error("Unexpected error:", error);
        }
      }
    } else {
      console.log("Warning: No participants specified");
    }
  };
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
            dispatch(setLetterStatus(LetterStatusEnum.DRAFT));
            sendLetter(letter);
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
                      <Label htmlFor="የተቀባይ ስም">ለ</Label>

                      <Select
                        isMulti
                        name={String(RolesEnum.RECIPIENT)}
                        options={userOptions}
                        onChange={handleChange}
                        className="w-full "
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
                  dispatch(setLetterStatus(LetterStatusEnum.PENDING_APPROVAL));
                  // console.log(sendLetter(letter));
                  sendLetter(letter);
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
