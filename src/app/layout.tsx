import type { Metadata, Viewport } from "next";
import { Chewy, Nunito, Sniglet } from "next/font/google";
import "./globals.css";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
});

const nunito = Nunito({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const sniglet = Sniglet({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-sniglet",
});

export const metadata: Metadata = {
  title: "Promise Day ✨ Our Promises",
  description: "A cute shared promise board for you and your person. Create a room, add promises, watch them sync in realtime.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Promise Day" },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF8E7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${chewy.variable} ${nunito.variable} ${sniglet.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
