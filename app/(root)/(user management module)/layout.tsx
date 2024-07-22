import type { Metadata } from "next";
import { Noto_Serif_Ethiopic } from "next/font/google";
import "@/app/globals.css";
import { StoreProvider } from "@/app/StoreProvider";
import { TopBar } from "@/components/layouts";
import { Toaster } from "sonner";
import { RequireAuth } from "@/components/shared";
import Providers from "@/providers/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
						<Providers>
							<ToastContainer />
							{/* <div className="absolute">
								<Toaster richColors position="top-center" />
							</div> */}
							<TopBar />
							{children}
						</Providers>
					</RequireAuth>
				</body>
			</html>
		</StoreProvider>
	);
}
