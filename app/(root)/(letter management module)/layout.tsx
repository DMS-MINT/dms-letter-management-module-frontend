import "@/app/globals.css";
import { RequireAuth } from "@/components/hoc";
import { TopBar } from "@/components/layouts";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
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
