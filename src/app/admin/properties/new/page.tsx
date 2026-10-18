"use client";

import AdminPropertyForm from "@/components/AdminPropertyForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  return (
    <div className="pb-12 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#E3572D] transition-colors text-xs sm:text-sm font-semibold mb-3"
          >
            <ChevronLeft size={16} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Add New Property</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to list a new property on FYD Homes</p>
        </div>

        <AdminPropertyForm />
      </div>
    </div>
  );
}
