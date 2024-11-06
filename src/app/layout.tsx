import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";
import Provider from "@/store/Provider";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700"],
	variable: "--roboto",
	display: "swap",
	style: ["normal", "italic"],
});

const openSans = Open_Sans({ subsets: ["latin"], variable: "--open-sans" });

export const metadata: Metadata = {
	title: "Qualitrends",
	description: "",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn(openSans.variable, roboto.variable)}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
