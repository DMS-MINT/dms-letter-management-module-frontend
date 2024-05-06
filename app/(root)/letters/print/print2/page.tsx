import {
  LaptopMinimal,
  Locate,
  LocateFixedIcon,
  LocateIcon,
  Mail,
  Map,
  MapPin,
  Phone,
  Scan,
  ScanSearch,
  WebhookIcon,
} from "lucide-react";

export default function Letter2() {
  // Create a Date object from the provided string
  const date = new Date("2016-09-04");

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
          <p className="text-lg  text-gray-600">ለ አዲስ አበባ ዩኒቨርስቲ</p>
          <p className="text-lg  text-gray-600 underline">አዲስ አበባ</p>
        </div>
        <div className="flex flex-col pt-10 gap-3 font-serif">
          <p className="text-lg  text-gray-600 text-center">
            ጉዳዩ:- የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
          </p>
          <p className="text-sm font-light text-gray-600 ">
            አዲስ አበባ የሚገኘው የሩሲያ ፌዴሬሽን ኤምባሲ እ.ኤ.እ ኤፕሪል 2 ቀን 2024 በቁጥር 757 በጻፈው ኖት
            ቨርባል የ2024 National Prize for Future Technologies በሚል ማዕቀፍ በሳይንስና
            ቴክኖሎጂ እንዱሁም በተፈጥሮ ሳይንስ (በሂሳብ፣በፊዝክስ፣በኤሚስቲሪ በባዮሜዲሲን፤ ኢንጂነሪንግ፣ ወዘተ.)
            ልማት ተጽዕኖ የፈጠሩ የአዲስ ግኝት (Discovery) አበርክቶ ላላቸው ከሀገራቸው ዉጭ ለሚገኙ
            ሳይንቲስቶች፣ ተመራማሪ ቡድኖች የሚሰጥ የዕውቅና ሽልማት ላይ ተሳትፎ እንዲናደርግ የጋበዘን መሆኑን
            አሳውቋል፡፡ ይህ ሽልማት አሁን ላይ ባለፉት አስርት አመታት የላቀ ስራ ላከናወነ ሳይንስቶች የሚሰጥ ሲሆን
            የሽልማቱም መጠን 10 ሚልዮን የሩሲያ ሩብልስ ወይም 110 ሺ የአሜሪካ ዶላር የሚጠጋ መሆኑም ተገልጿል፡፡
            የሽልማቱ እጩዎችም በግል፤በስራ ባለደረባ እና በሳይንሳዊ ተቋማት እንደ ዩኒቨርሲቲ የምርምር ተቋማት ወዘተ
            መቅረብ ይችላሉ፡፡ የአዲስ ግኝት (Discovery) ሽልማት የማመልከቻ ጊዜን አስመልክቶ እ.ኤ.አ ከማርች 3
            እስከ ሜይ 20 ቀን 2024 ድረስ ብቻ በዚህ በዌብሳይት https://yzovaward.com/en/ ማመልከት
            የሚቻል መሆኑን አሳውቋል። በመሆኑም ጉዳዩ የሚመለከታችሁ ሁሉ በዚህ የእውቅና ሽልማት ላይ ተሳታፊ እንዲትሆኑ
            ይረዳ ዘንድ ክሩሲያ ኤምባሲ የተላከውን ዶክመንት 16 ገጽ አባሪ አድርገን ከዚህ ሸኚ ደብዳቤ ጋር የላክን
            መሆኑን በመሆኑም ጉዳዩ የሚመለከታችሁ ሁሉ በዚህ የእውቅና ሽልማት ላይ ተሳታፊ እንዲትሆኑ ይረዳ ዘንድ
            ክሩሲያ ኤምባሲ የተላከውን ዶክመንት 16 ገጽ አባሪ አድርገን ከዚህ ሸኚ ደብዳቤ ጋር የላክን መሆኑን
            እንገልጻለን፡፡
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
            <li>ለሚንስትር ጽ/ቤት</li>

            <p className="underline">ኢ.ቴ.ሚ</p>
          </ul>
        </div>

        <div className="pt-4 pb-6 font-serif">
          <p>ግልባጭ:-</p>
          <ul className="pl-5">
            <li>ለኢንፎርሜሽንና ቴክኖሎጂ ፓርክ ኮርፖሬሽን (አይሲቲ ፓርክ)</li>
            <li className="underline">አዲስ አበባ</li>
            <li>ለህግ ጉዳዮች ስራ አስፈፃሚ</li>
            <p className="underline">ኢ.ቴ.ሚ</p>
          </ul>
        </div>
      </div>
    </div>
  );
}
