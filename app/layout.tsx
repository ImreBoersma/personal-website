import type { Metadata } from "next";
import { Archivo, Lato } from "next/font/google";
import "./globals.css";

// Display font — used for headings/hero, so it stays preloaded. Loaded as a
// single variable font (all weights in one file) instead of static weight files.
const archivo = Archivo({
	variable: "--font-archivo",
	subsets: ["latin"],
});

// Body font, used site-wide.
const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Imre Boersma | Softwareontwikkelaar",
	description:
		"Imre Boersma is softwareontwikkelaar bij Watch-E in Arnhem, gespecialiseerd in het bouwen van webapplicaties met oog voor performance, schaalbaarheid en gebruikerservaring. Met een passie voor heldere code en doordachte oplossingen werkte Imre aan uiteenlopende projecten in verschillende branches.",
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico", sizes: "any" },
			{ url: "/favicon/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
			{ url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
		],
		apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
	},
	manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="nl"
			className={`${archivo.variable} ${lato.variable} h-full antialiased`}
		>
			<body className="min-h-full bg-zinc-50 text-zinc-900">{children}</body>
		</html>
	);
}
