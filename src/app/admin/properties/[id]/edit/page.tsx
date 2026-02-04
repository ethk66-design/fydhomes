import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AdminPropertyForm from "@/components/AdminPropertyForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    notFound();
  }

  // Parse images if stored as JSON string
  let images = property.images;
  if (typeof images === 'string') {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }

  // Parse tags if stored as JSON string
  let tags = property.tags;
  if (typeof tags === 'string') {
    try {
      tags = JSON.parse(tags);
    } catch {
      tags = [];
    }
  }

  const propertyData = {
    ...property,
    images: Array.isArray(images) ? images : [],
    tags: Array.isArray(tags) ? tags : [],
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Edit Property</h1>
          <p className="text-[#5c5c5c] text-sm sm:text-base line-clamp-1">Update the details for &quot;{property.title}&quot;</p>
        </div>

        <AdminPropertyForm initialData={propertyData} isEditing />
      </div>
    </div>
  );
}
