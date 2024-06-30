import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ParticipantRolesEnum } from "@/typing/enum";
import { ILetterDetails } from "@/typing/interface";

interface HeaderTemplateProps {
  letterDetails: ILetterDetails;
}

const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ letterDetails }) => {
  return (
    <>
      <style>
        {`
          .print-template {
            padding-bottom: 0;
            font-family: Arial, sans-serif;
          }
          .underline {
            text-decoration-line: underline;
          }
          .flex-col {
            display: flex;
            flex-direction: column;
          }
          .flex {
            display: flex;
          }
          .justify-between {
            justify-content: space-between;
          }
          .items-center {
            align-items: center;
          }
          .items-end {
            align-items: flex-end;
          }
          .gap-0 {
            gap: 0;
          }
          .gap-1 {
            gap: 0.25rem;
          }
          .gap-2 {
            gap: 0.5rem;
          }
          .p-16 {
            padding: 4rem;
          }
          .w-60 {
            width: 15rem;
          }
          .h-36 {
            height: 9rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .border-black {
            border-color: black;
          }
          .border-b-1 {
            border-bottom-width: 1px;
          }
          .pt-4 {
            padding-top: 1rem;
          }
          .pt-5 {
            padding-top: 1.25rem;
          }
          .pt-10 {
            padding-top: 2.5rem;
          }
          .pb-6 {
            padding-bottom: 1.5rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .text-md {
            font-size: 1rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .text-center {
            text-align: center;
          }
          .font-serif {
            font-family: Georgia, serif;
          }
          .font-mono {
            font-family: Menlo, monospace;
          }
          .text-gray-600 {
            color: #4a5568;
          }
          .font-light {
            font-weight: 300;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .shadow-md {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .w-[132px] {
            width: 132px;
          }
          .h-[132px] {
            height: 132px;
          }
          .mr-24 {
            margin-right: 6rem;
          }
          .ml-44 {
            margin-left: 11rem;
          }
          .pl-5 {
            padding-left: 1rem;
          }
          .pr-5 {
            padding-right: 1rem;
          }
          .pl-1 {
            padding-left: 0.25rem;
          }
          .print-template header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          .print-template hr {
            margin-bottom: 1rem;
            border-bottom: 2px solid black;
          }
          .line-height-05 {
            line-height: 0.5cm;
          }
          .font-bold {
            font-weight: bold;
          }
        `}
      </style>
      <div className="print-template">
        <header>
          <img src="/image/Type=1.svg" alt="Logo 1" className="w-60 h-36" />
        </header>
        <hr className="mb-2 border-b-2" />
        <div className="flex flex-col items-end pt-2 font-serif">
          <div className="flex items-center gap-1 font-serif">
            <div className="line-height-05">
              <p className="text-sm">
                ቁጥር / ref.no:-{" "}
                <span className="pl-1 underline">
                  {letterDetails?.reference_number
                    ? `${letterDetails?.reference_number}`
                    : "Draft letter"}
                </span>
              </p>
              <p className="text-sm">
                ቀን / Date:-{" "}
                <span className="pl-1 underline">
                  {new Date(letterDetails.created_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-serif gap-0">
          {letterDetails?.participants
            .filter(
              (participant) =>
                participant.role === ParticipantRolesEnum["PRIMARY RECIPIENT"]
            )
            .map((participant) => (
              <p key={uuidv4()} className="text-md">
                ለ{" "}
                {participant?.user.user_type === "member"
                  ? participant.user.job_title
                  : participant.user.name}
              </p>
            ))}
          <p className="text-sm underline">አዲስ አበባ</p>
        </div>
        <div className="flex flex-col pt-2 gap-3 font-serif">
          <p className="text-lg text-center">
            ጉዳዩ:- <span className="font-bold">{letterDetails?.subject}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderTemplate;
