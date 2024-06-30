import { LaptopMinimal, Mail, MapPin, Phone, ScanSearch } from "lucide-react";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ParticipantRolesEnum } from "@/typing/enum";

interface OutgoingLetterPrintPreviewProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

export default function OutgoingLetterPrintPreview({
  forwardedRef,
}: OutgoingLetterPrintPreviewProps) {
  const letterDetails = useAppSelector(selectLetterDetails);

  const DateFormat: string = "MMMM dd yyy";

  return (
    <div ref={forwardedRef} className="justify-center h-full flex-1 flex ">
      <div className=" bg-white rounded-lg flex flex-col p-16 w-[797px]">
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
        <div className="flex flex-col pt-10 gap-3 font-serif">
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
            {letterDetails?.current_state === "Published" ? (
              <img
                src="/image/Type=2.svg"
                alt="Logo 1"
                className="w-[132px] h-[132px] ml-24"
              />
            ) : null}

            <div className="flex justify-center">
              {letterDetails?.signature ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${letterDetails?.signature}`}
                  className="w-[400px] ml-60"
                />
              ) : null}
            </div>
          </div>
        </div>

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
        <footer className="flex justify-between items-center w-[653px]">
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex gap-1 ">
              <LaptopMinimal />
              <p>WWW.MINT.gov.et</p>
            </div>
            <div className="flex gap-1 ">
              <Phone />
              <p>251111264994</p>
            </div>
            <div className="flex gap-1 ">
              <ScanSearch />
              <p>mint @ethionet.et </p>
            </div>
            <div className="flex gap-1 ">
              <Mail />
              <p>2490 </p>
            </div>
            <div className="flex gap-1 ">
              <MapPin />
              <p>Addis Ababa Ethiopia </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
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
            className="w-[75px] h-[75px] ml-16"
          />
        </footer>
      </div>
    </div>
  );
}
