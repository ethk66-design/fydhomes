"use client";

import AdminPropertyForm from "@/components/AdminPropertyForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
      <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

      <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
        <div className="mb-6 sm:mb-10">
          <Link 
            href="/admin" 
            className="flex items-center gap-1.5 sm:gap-2 text-[#5c5c5c] hover:text-[#2d7a8c] transition-colors text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-black font-serif">Add New Property</h1>
          <p className="text-[#5c5c5c] text-sm sm:text-base">Fill in the details to list a new property on FYD Homes</p>
        </div>

        <AdminPropertyForm />
      </div>
    </div>
  );
}
