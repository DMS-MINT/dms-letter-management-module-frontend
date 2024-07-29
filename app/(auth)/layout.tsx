import { StoreProvider } from "@/app/StoreProvider";
import "@/app/globals.css";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import { Toaster } from "sonner";

const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "የተጠቃሚ መግቢያ",
	description: "Efficiently manage and secure your account credentials.",
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
		<StoreProvider>
			<html lang="am">
				<body className={noto_serif_ethiopic.className}>
					<Providers>
						<div className="absolute">
							<Toaster richColors position="top-center" />
						</div>
						{children}
					</Providers>
				</body>
			</html>
		</StoreProvider>
	);
}
