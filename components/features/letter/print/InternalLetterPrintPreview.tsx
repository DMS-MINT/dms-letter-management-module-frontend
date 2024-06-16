"use client";

import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { ParticipantRolesEnum } from "@/typing/enum";
import { v4 as uuidv4 } from "uuid";

export default function InternalLetterPrintPreview() {
  const letterDetails = useAppSelector(selectLetterDetails);

  return (
    <div className="bg-gray-200 justify-center items-center h-fit pt-20   flex-1 flex ">
      <div className=" bg-white rounded-lg shadow-md flex flex-col p-16 w-[797px] h-[1300px]">
        <header className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center w-full font-serif">
            <img src="/image/Type=1.svg" alt="Logo 1" className="w-60 h-36" />
          </div>
        </header>

        <hr className="mb-4 border-b-1 border-black" />
        <div className="flex flex-col items-end gap-1 pt-5 font-serif">
          {" "}
          <div className="flex gap-2 ">
            <div className="flex flex-col  ">
              <p className="text-sm  text-gray-600">ቁጥር</p>
              <p className="text-sm  text-gray-600">ref.no</p>
            </div>
            <div className="flex flex-col w-32 font-mono">
              <p>N543475</p>
              <hr className="border-b-1 border-black" />
            </div>
          </div>{" "}
          <div className="flex gap-2 font-serif">
            <div className="flex flex-col ">
              <p className="text-sm  text-gray-600">ቀን</p>
              <p className="text-sm  text-gray-600">Date</p>
            </div>
            <div className="flex flex-col w-32 font-mono  ">
              <p>ሚያዚያ 03 2016</p>
              <hr />
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-4 font-serif ">
          {letterDetails.participants
            .filter(
              (participant) =>
                participant.role_name ===
                ParticipantRolesEnum["PRIMARY RECIPIENT"]
            )
            .map((participant) => (
              <p key={uuidv4()} className="text-lg  text-gray-600">
                ለ{" "}
                {participant.user.user_type === "member"
                  ? participant.user.job_title
                  : participant.user.name}
              </p>
            ))}
          <p className="text-lg  text-gray-600 underline">አዲስ አበባ</p>
        </div>
        <div className="flex flex-col pt-10 gap-3 font-serif">
          <p className="text-lg  text-gray-600 text-center">
            ጉዳዩ:- {letterDetails.subject}
          </p>
          <p className="text-sm font-light text-gray-600 ">
            {letterDetails.content}
          </p>
          <div className="flex justify-center mt-5">
            <div className="flex justify-center">
              <img
                src="/image/Type=2.svg"
                alt="Logo 1"
                className="w-[132px] h-[132px] mr-24"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/image/signature1.svg"
                alt="Logo 1"
                className="w-[132px] h-[132px] ml-44"
              />
            </div>
          </div>
        </div>
        <div className="pt-4 pb-6 font-serif">
          <p>ግልባጭ:-</p>
          <ul className="pl-5">
            {letterDetails.participants
              .filter(
                (participant) =>
                  participant.role_name ===
                  ParticipantRolesEnum["CARBON COPY RECIPIENT"]
              )
              .map((participant) => (
                <li key={uuidv4()}>
                  ለ{" "}
                  {participant.user.user_type === "member"
                    ? participant.user.job_title
                    : participant.user.name}
                </li>
              ))}

            <p className="underline">ኢ.ቴ.ሚ</p>
          </ul>
        </div>

        <div className="pt-4 pb-6 font-serif">
          <p>ግልባጭ:-</p>
          <ul className="pl-5">
            {letterDetails.participants
              .filter(
                (participant) =>
                  (participant.role_name =
                    ParticipantRolesEnum["CARBON COPY RECIPIENT"])
              )
              .map((participant) => (
                <>
                  <li key={uuidv4()}>
                    ለ{" "}
                    {participant.user.user_type === "member"
                      ? participant.user.job_title
                      : participant.user.name}
                  </li>
                  <li className="underline">
                    {participant.user.user_type === "member"
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
