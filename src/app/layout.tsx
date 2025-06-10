import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";

const lato = Lato({
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Snackk",
	description:
		"Snackk is a cloud-based messaging app that helps teams communicate and collaborate. It's designed to help organizations work more flexibly and inclusively, and can be used by teams of all sizes.",
};

export default function RootLayout({
	children,
}: Readonly<{ 
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={lato.className}>{children}</body>
		</html>
	);
}
