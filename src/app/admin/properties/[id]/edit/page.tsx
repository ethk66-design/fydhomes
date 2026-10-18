import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AdminPropertyForm from "@/components/AdminPropertyForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Property } from "@/lib/types";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      tags: true,
    },
  });

  if (!property) {
    notFound();
  }

  // Transform to match AdminPropertyForm interface (flatten relations to arrays)
  const propertyData = {
    ...property,
    images: property.images.map((img) => img.url),
    tags: property.tags.map((t) => t.tag),
    created_at: property.created_at.toISOString(),
    updated_at: property.updated_at.toISOString(),
  } as unknown as Property;

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Edit Property</h1>
          <p className="text-gray-500 text-sm mt-1 line-clamp-1">Update details for &quot;{property.title}&quot;</p>
        </div>

        <AdminPropertyForm initialData={propertyData} isEditing />
      </div>
    </div>
  );
}
