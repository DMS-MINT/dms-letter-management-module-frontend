/** @format */

"use client";
import { LaptopMinimal, Mail, MapPin, Phone, ScanSearch } from "lucide-react";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { v4 as uuidv4 } from "uuid";

export default function OutgoingLetterPrintPreview() {
  const letterDetails = useAppSelector(selectLetterDetails);
  return (
    <div className='bg-gray-200 justify-center items-center h-fit pt-20  w-[210mm] flex-1 flex '>
      <div className=' bg-white rounded-lg shadow-md flex flex-col p-16 w-[210mm] h-[auto] overflow-auto overflow-x-wrap'>
        <header className='flex justify-between items-center mb-4'>
          <img src='/image/star.png' alt='Logo 1' className='w-20 h-20' />

          {/* <div className="flex flex-col items-center w-full font-serif">
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
          </div> */}
          <img src='/image/innovation.png' alt='Logo 1' className='w-28 h-20' />
        </header>

        <hr className='mb-4 border-b-1 border-black' />
        <div className='flex flex-col items-end gap-1 pt-5 font-serif'>
          {" "}
          <div className='flex gap-2 '>
            <div className='flex flex-col  '>
              <p className='text-sm  text-gray-600'>ቁጥር</p>
              <p className='text-sm  text-gray-600'>ref.no</p>
            </div>
            <div className='flex flex-col w-32 font-mono'>
              <p>N543475</p>
              <hr className='border-b-1 border-black' />
            </div>
          </div>{" "}
          <div className='flex gap-2 font-serif'>
            <div className='flex flex-col '>
              <p className='text-sm  text-gray-600'>ቀን</p>
              <p className='text-sm  text-gray-600'>Date</p>
            </div>
            <div className='flex flex-col w-32 font-mono  '>
              <p>ሚያዚያ 03 2016</p>
              <hr />
            </div>
          </div>
        </div>
        <div className='flex flex-col pt-4 font-serif '>
          {letterDetails.participants
            .filter((participant) => participant.role === "Recipient")
            .map((participant) => (
              <p key={uuidv4()} className='text-lg  text-gray-600'>
                ለ{" "}
                {participant.user.user_type === "member"
                  ? participant.user.job_title
                  : participant.user.name}
              </p>
            ))}
          <p className='text-lg  text-gray-600 underline'>አዲስ አበባ</p>
        </div>
        <div className='flex flex-col pt-10 gap-3 font-serif'>
         <p className='text-lg  text-gray-600 text-center'>
             ጉዳዩ:- {letterDetails.subject}
          </p>
          <p className='text-sm font-light text-gray-600 h-[auto] overflow-auto overflow-x-auto '>
            {letterDetails.content}
          </p>
          <div className='flex justify-center'>
            <img
              src='/image/Type=2.svg'
              alt='Logo 1'
              className='w-[132px] h-[132px] ml-16'
            />
          </div>
        </div>

        <div className='pt-4 pb-6 font-serif'>
          <p>ግልባጭ:-</p>
          <ul className='pl-5'>
            {letterDetails.participants
              .filter(
                (participant) => participant.role === "Carbon Copy Recipient"
              )
              .map((participant) => (
                <li key={uuidv4()}>
                  ለ{" "}
                  {participant.user.user_type === "member"
                    ? participant.user.job_title
                    : participant.user.name}
                </li>
              ))}
            <p>ኢ.ቴ.ሚ</p>
          </ul>
        </div>
        <div className='pt-4 pb-6 font-serif'>
          <p>እንዲያውቁ:-</p>
          <ul className='pl-5 overflow-auto h-[auto]'>
            {letterDetails.participants
              .filter(
                (participant) => participant.role === "Carbon Copy Recipient"
              )
              .map((participant) => (
                <>
                  <li key={uuidv4()}>
                    ለ{" "}
                    {participant.user.user_type === "member"
                      ? participant.user.job_title
                      : participant.user.name}
                  </li>
                  <li className='underline'>
                    {participant.user.user_type === "member"
                      ? "ኢ.ቴ.ሚ"
                      : "አዲስ አበባ"}
                  </li>
                </>
              ))}
          </ul>
        </div>
        <hr className='mb-6  border-b-1 border-black mt-auto ' />
        <footer className='flex justify-between items-center w-[653px] h-[109px]  '>
          <div className='flex flex-col gap-1 text-sm'>
            <div className='flex gap-1 '>
              <LaptopMinimal />
              <p>WWW.MINT.gov.et</p>
            </div>
            <div className='flex gap-1 '>
              <Phone />
              <p>251111264994</p>
            </div>
            <div className='flex gap-1 '>
              <ScanSearch />
              <p>mint @ethionet.et </p>
            </div>
            <div className='flex gap-1 '>
              <Mail />
              <p>2490 </p>
            </div>
            <div className='flex gap-1 '>
              <MapPin />
              <p>Addis Ababa Ethiopia </p>
            </div>
          </div>
          <div className='flex flex-col items-center w-full'>
            <h2 className='text-2xl font-bold text-gray-800 text-center'>
              ከእርምጃ ወደ ሩጫ
            </h2>

            <p className='text-base  text-gray-600 text-center'>
              From Faciltator to Main Actor
            </p>
          </div>
          <img
            src='/image/qr.png'
            alt='Logo 1'
            className='w-[75px] h-[75px] ml-16'
          />
        </footer>
      </div>
    </div>
  );
}
