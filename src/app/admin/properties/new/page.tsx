"use client";

import AdminPropertyForm from "@/components/AdminPropertyForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fb] pb-20">
      {/* Header Spacer */}
      <div className="h-[80px] bg-white border-b border-[#eeeeee]"></div>

      <div className="container mx-auto px-5 py-10">
        <div className="mb-10">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-[#5c5c5c] hover:text-[#2d7a8c] transition-colors text-sm font-medium mb-4"
          >
            <ChevronLeft size={16} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-black font-serif">Add New Property</h1>
          <p className="text-[#5c5c5c]">Fill in the details to list a new property on FYD Homes</p>
        </div>

        <AdminPropertyForm />
      </div>
    </div>
  );
}
