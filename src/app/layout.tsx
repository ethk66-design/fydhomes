import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "FYD Homes | Find Your Dream Home in Kochi",
  description: "Your Trusted Real Estate Partner in Kochi. Find beautiful villas, residential homes, and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
        <WhatsAppButton />
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
