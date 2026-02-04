import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-slab", // keeping consistent though not heavily used based on css
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FYD Homes | Find Your Dream Home in Kochi",
  description: "Your Trusted Real Estate Partner in Kochi. Find beautiful villas, residential homes, and commercial spaces.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    interactiveWidget: "resizes-content", // Key for Android keyboard handling
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${roboto.variable} ${robotoSlab.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
