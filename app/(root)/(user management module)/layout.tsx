import "@/app/globals.css";
import { RequireAuth } from "@/components/hoc";
import { TopBar } from "@/components/layouts";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "የእኔ መገለጫ",
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
			<body className={noto_serif_ethiopic.className}>
				<Providers>
					<RequireAuth>
						<ToastContainer />
						<div className="absolute">
							<Toaster richColors position="top-center" />
						</div>
						<TopBar />
						{children}
					</RequireAuth>
				</Providers>
			</body>
		</html>
	);
}
