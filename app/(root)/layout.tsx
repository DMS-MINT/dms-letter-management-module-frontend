import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import "@/app/globals.css";
import StoreProvider from "@/redux/store/StoreProvider";
import { Topbar } from "@/components/layouts";
// import "@/components/tags/style.css";
const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Letter Management System",
  description: "Efficiently manage and organize your letters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="am">
        <body className={noto_serif_ethiopic.className}>
          <Topbar />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
