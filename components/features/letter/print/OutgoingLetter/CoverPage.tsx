"use client";

import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { ParticipantRolesEnum } from "@/typing/enum";
import { IMember } from "@/typing/interface";
import { LaptopMinimal, Mail, MapPin, Phone, ScanSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const ICON_SIZE: number = 16;

type CoverPageProps = {
  text: string;
  addWordsToElement: (
    text: string,
    element: HTMLDivElement,
    page: number
  ) => void;
};

export default function CoverPage({ text, addWordsToElement }: CoverPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const letterDetails = useAppSelector(selectLetterDetails);
  const [author, setAuthor] = useState<IMember>({
    id: "",
    full_name: "",
    job_title: "",
    user_type: "member",
  });

  const DateFormat: string = "MMMM dd yyy";

  useEffect(() => {
    const author = letterDetails?.participants.filter(
      (participant) => participant.role === ParticipantRolesEnum.AUTHOR
    )[0]?.user;
    if (author?.user_type === "member") {
      setAuthor(author);
    }
  }, [letterDetails]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.innerHTML = "";
      addWordsToElement(text, contentElement, 0);
    }
  }, [contentRef.current, text]);

  return (
    <div className=" bg-white rounded-lg p-16 w-[797px] h-[280mm]">
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center mb-4">
          <img src="/image/star.png" alt="Logo 1" className="w-20 h-20" />
          <div className="flex flex-col items-center w-full font-serif">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              በ ኢትዮጲያ ፌደረላዊ ሪፐብሊክ
            </h2>
            <h2 className="text-xl font-bold text-gray-800 text-center">
              የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር
            </h2>
            <p className="text-base  text-gray-600 text-center">
              The Federal Democratic Republic of Ethiopia
            </p>
            <p className="text-base  text-gray-600 text-center">
              Minister of Innovation and Technology
            </p>
          </div>
          <img src="/image/innovation.png" alt="Logo 1" className="w-28 h-20" />
        </header>

        <hr className="mb-4 border-b-1 border-black" />

        <div className="flex flex-col items-end gap-1 pt-2 font-serif">
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

        <p className="text-lg text-black text-center my-3">
          ጉዳዩ:- <u>{letterDetails?.subject ? letterDetails?.subject : "N/A"}</u>
        </p>

        <div
          ref={contentRef}
          className="flex flex-col font-serif flex-1 overflow-hidden"
        >
          {/* <div id="letter-content" className="border border-black">
              <div
                className="text-base font-light text-black max-h-full"
                dangerouslySetInnerHTML={{
                  __html:
                    letterDetails?.content ||
                    "",
                }}
              />
            </div> */}
        </div>

        {letterDetails?.signature ? (
          <div className="relative flex flex-col items-end">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${letterDetails?.signature}`}
              className="w-[400px]"
            />
            <div className="w-fit absolute bottom-0 right-0 flex flex-col gap-1 items-end">
              <span>{author.id ? author.full_name : ""}</span>
              <span>{author.id ? author.job_title : ""}</span>
            </div>
          </div>
        ) : null}

        <div className="pt-4 pb-6 font-serif">
          <p>ግልባጭ:-</p>
          <ul className="pl-5">
            {letterDetails?.participants
              .filter(
                (participant) =>
                  participant.role ===
                  ParticipantRolesEnum["CARBON COPY RECIPIENT"]
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

        <hr className="mb-1 border-b-1 border-black mt-auto" />

        <footer className="flex justify-between items-center">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex gap-1 ">
              <LaptopMinimal size={ICON_SIZE} />
              <p>WWW.MINT.gov.et</p>
            </div>
            <div className="flex gap-1 ">
              <Phone size={ICON_SIZE} />
              <p>251111264994</p>
            </div>
            <div className="flex gap-1 ">
              <ScanSearch size={ICON_SIZE} />
              <p>mint @ethionet.et </p>
            </div>
            <div className="flex gap-1 ">
              <Mail size={ICON_SIZE} />
              <p>2490 </p>
            </div>
            <div className="flex gap-1 ">
              <MapPin size={ICON_SIZE} />
              <p className="block min-h-fit">Addis Ababa Ethiopia </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-fit">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              ከእርምጃ ወደ ሩጫ
            </h2>
            <p className="text-base text-gray-600 text-center">
              From Faciltator to Main Actor
            </p>
          </div>
          <img
            src="/image/qr.png"
            alt="Logo 1"
            className="w-24 aspect-square"
          />
        </footer>
      </div>
    </div>
  );
}
