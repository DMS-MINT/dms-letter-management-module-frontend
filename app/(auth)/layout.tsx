import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import "@/app/globals.css";
import Logo from "@/public/assets/logo.svg";
import MINT_Logo from "@/public/assets/mint_logo.svg";
import Image from "next/image";

const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description: "Efficiently manage and secure your account credentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am">
      <body className={`${noto_serif_ethiopic.className} grid grid-cols-2`}>
        <aside className="bg-gradient px-14 pt-20 pb-14 flex flex-col justify-between">
          <div>
            <Image src={Logo} alt="logo" width={30} height={30} />
            <h2 className="text-white font-medium text-xl mt-5 mb-2">
              የሰነድ አስተዳደር እና ኢ-ፊርማ
            </h2>
            <p className="text-gray-200 font-light text-sm">
              ጥረት የለሽ ሰነድ እና የደብዳቤ አስተዳደር፣ እንከን የለሽ ፊርማዎች።
            </p>
          </div>
          <div className="flex gap-2 items-end">
            <p className="text-gray-200">በኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር በኩራት የተደገፈ</p>
            <Image src={MINT_Logo} alt="logo" width={30} height={30} />
          </div>
        </aside>
        <aside className="grid items-center px-24 h-full">{children}</aside>
      </body>
    </html>
  );
}
