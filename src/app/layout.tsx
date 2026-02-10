import type { Metadata, Viewport } from "next";
import { Chewy, Nunito, Sniglet } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : new URL("https://promise-day-xi.vercel.app"),
  title: "Promise Day ✨ Our Promises",
  description:
    "A cute shared promise board for you and your person. Create a room, add promises, watch them sync in realtime.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Promise Day" },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "Promise Day ✨ Our Promises",
    description:
      "A cute shared promise board for you and your person. Create a room, add promises, watch them sync in realtime.",
    siteName: "Promise Day",
    url: "/",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Promise Day — Our promises, one room." },
      { url: "/promise-day-logo.png", width: 512, height: 256, alt: "Promise Day" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promise Day ✨ Our Promises",
    description:
      "A cute shared promise board for you and your person. Create a room, add promises, watch them sync in realtime.",
    images: ["/opengraph-image"],
  },
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
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
