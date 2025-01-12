import "@/app/globals.css";
import { RequireAuth } from "@/components/hoc";
import { TopBar } from "@/components/layouts";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "sonner";

// const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });
const myFont = localFont({
	src: "../../../public/fonts/NotoSerifEthiopic-VariableFont_wdth,wght.ttf",
});

export const metadata: Metadata = {
	title: "የደብዳቤ አስተዳደር ሞጁል",
	description: "Efficiently manage and organize your letters.",
	icons: {
		icon: "/icons/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="am">
			<body className={myFont.className}>
				<Script src="/lib/STPadServerLib-3.4.0.js" strategy="beforeInteractive" />
				<Providers>
					<RequireAuth>
						<div className="flex h-full flex-col">
							<div className="absolute">
								<Toaster richColors position="top-center" />
							</div>
							<TopBar />
							{children}
						</div>
					</RequireAuth>
				</Providers>
			</body>
		</html>
	);
}
