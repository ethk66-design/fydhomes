import React from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export const metadata = {
  title: "Admin Portal | FYD Homes",
  description: "Management and control dashboard for FYD Homes",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <AdminNavbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
