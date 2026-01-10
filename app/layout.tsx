import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "George Nakashyan | Full Stack Software Engineer | React, Next.js, PostgreSQL",
	description: "Full Stack Software Engineer specializing in Next.js, React, PostgreSQL, and TypeScript. View my portfolio of scalable web applications.",
	keywords: ["full stack developer", "software engineer", "Next.js", "React", "PostgreSQL", "TypeScript", "New York", "web development"],
	authors: [{ name: "George Nakashyan" }],
	creator: "George Nakashyan",
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://georgenakashyan.com'),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "/",
		title: "George Nakashyan | Full Stack Software Engineer",
		description: "Full Stack Software Engineer specializing in Next.js, React, PostgreSQL, and TypeScript. View my portfolio of scalable web applications.",
		siteName: "George Nakashyan Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "George Nakashyan | Full Stack Software Engineer",
		description: "Full Stack Software Engineer specializing in Next.js, React, PostgreSQL, and TypeScript.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased scroll-smooth flex flex-col min-h-screen`}
			>
				<Navbar />
				<PageTransition>
					<main className="flex-grow">
						{children}
					</main>
				</PageTransition>
				<Footer />
			</body>
		</html>
	);
}
