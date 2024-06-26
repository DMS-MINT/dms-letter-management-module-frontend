import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import "@/app/globals.css";
import { StoreProvider } from "@/app/StoreProvider";
import { TopBar } from "@/components/layouts";
import { Toaster } from "sonner";
import { RequireAuth } from "@/components/utils";

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
          <RequireAuth>
            <div className="absolute">
              <Toaster richColors position="top-center" />
            </div>
            <TopBar />
            {children}
          </RequireAuth>
        </body>
      </html>
    </StoreProvider>
  );
}
