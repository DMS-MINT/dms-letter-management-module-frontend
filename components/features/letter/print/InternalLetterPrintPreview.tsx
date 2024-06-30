"use client";

import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { ParticipantRolesEnum } from "@/typing/enum";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

interface InternalLetterPrintPreviewProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

export default function InternalLetterPrintPreview({
  forwardedRef,
}: InternalLetterPrintPreviewProps) {
  const letterDetails = useAppSelector(selectLetterDetails);

  const DateFormat: string = "MMMM dd yyy";

  return (
    <div ref={forwardedRef} className="justify-center h-fit flex-1 flex ">
      <div className=" bg-white rounded-lg flex flex-col p-16 w-[797px]">
        <header className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center w-full font-serif">
            {letterDetails?.current_state === "Published" ? (
              <img src="/image/Type=1.svg" alt="Logo 1" className="w-60 h-36" />
            ) : null}
          </div>
        </header>
        {letterDetails?.current_state === "Published" ? (
          <hr className="mb-4 border-b-1 border-black" />
        ) : null}
        <div className="flex flex-col items-end gap-1 pt-5 font-serif">
          <div className="flex gap-2 ">
            <div className="flex flex-col  ">
              <p className="text-sm  text-gray-600">ቁጥር</p>
              <p className="text-sm  text-gray-600">ref.no</p>
            </div>
            <div className="flex flex-col w-32 font-mono">
              <p>
                {letterDetails?.reference_number
                  ? letterDetails?.reference_number
                  : "N/A"}
              </p>
              <hr className="border-b-1 border-black" />
            </div>
          </div>
          <div className="flex gap-2 font-serif">
            <div className="flex flex-col ">
              <p className="text-sm  text-gray-600">ቀን</p>
              <p className="text-sm  text-gray-600">Date</p>
            </div>
            <div className="flex flex-col w-32 font-mono  ">
              <p>
                {letterDetails?.created_at
                  ? format(new Date(letterDetails?.created_at), DateFormat)
                  : "N/A"}
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-4 font-serif ">
          {letterDetails?.participants
            .filter(
              (participant) =>
                participant?.role === ParticipantRolesEnum["PRIMARY RECIPIENT"]
            )
            .map((participant) => (
              <p key={uuidv4()} className="text-lg text-black">
                ለ{" "}
                {participant?.user?.user_type === "member"
                  ? participant?.user?.job_title
                  : participant?.user?.name}
              </p>
            ))}
          <p className="text-lg text-black underline">አዲስ አበባ</p>
        </div>

        <div className="flex flex-col pt-6 gap-3 font-serif">
          <p className="text-lg text-black text-center">
            ጉዳዩ:-{" "}
            <u>{letterDetails?.subject ? letterDetails?.subject : "N/A"}</u>
          </p>
          <div id="letter-content">
            <div
              className="text-base font-light text-black"
              dangerouslySetInnerHTML={{ __html: letterDetails?.content || "" }}
            />
          </div>
          <div className="flex justify-center">
            {letterDetails?.signature ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${letterDetails?.signature}`}
                className="w-[400px] ml-60"
              />
            ) : null}
          </div>
        </div>

        <div className="pb-6 font-serif">
          <p>እንዲያውቁት:-</p>
          <ul className="pl-5">
            {letterDetails?.participants
              .filter(
                (participant) =>
                  participant.role ===
                  ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"]
              )
              .map((participant) => (
                <li key={uuidv4()}>
                  ለ{" "}
                  {participant?.user?.user_type === "member"
                    ? participant?.user?.job_title
                    : participant?.user?.name}
                </li>
              ))}

            <p className="underline">ኢ.ቴ.ሚ</p>
          </ul>
        </div>

        <div className="pb-6 font-serif">
          <p>ግልባጭ:-</p>
          <ul className="pl-5">
            {letterDetails?.participants
              .filter(
                (participant) =>
                  participant.role ===
                  ParticipantRolesEnum["CARBON COPY RECIPIENT"]
              )
              .map((participant) => (
                <>
                  <li key={uuidv4()}>
                    ለ{" "}
                    {participant?.user?.user_type === "member"
                      ? participant?.user?.job_title
                      : participant?.user?.name}
                  </li>
                  <li className="underline">
                    {participant?.user?.user_type === "member"
                      ? "ኢ.ቴ.ሚ"
                      : "አዲስ አበባ"}
                  </li>
                </>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
