import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fydhomes.com", // Will be updated to canonical domain later
    siteName: "FYD Homes",
  },
  icons: {
    icon: '/favicon.png',
  },
  title: "FYD Homes | Find Your Dream Home in Kochi",
  description: "Your Trusted Real Estate Partner in Kochi. Find beautiful villas, residential homes, and commercial spaces.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://fydhomes.in'), // Fixes relative URL warnings
};

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content", // Key for Android keyboard handling
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${roboto.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
