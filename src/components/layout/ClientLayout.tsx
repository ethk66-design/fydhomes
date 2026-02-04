"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "sonner";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <SessionProvider>
            {!isAdmin && <Header />}
            {children}
            {!isAdmin && <WhatsAppButton />}
            {!isAdmin && <Footer />}
            <VisualEditsMessenger />
            <Toaster richColors position="bottom-right" />
        </SessionProvider>
    );
}
