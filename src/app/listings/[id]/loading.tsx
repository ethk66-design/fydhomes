"use client";

export default function PropertyDetailLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Gallery Skeleton */}
      <section className="w-full bg-white pt-4 sm:pt-6 pb-2">
        <div className="container mx-auto px-4 sm:px-5 lg:max-w-[1480px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-[10px]">
            <div className="md:col-span-2 aspect-video bg-gray-100 animate-pulse rounded" />
            <div className="flex flex-row md:flex-col gap-2 sm:gap-[10px]">
              <div className="flex-1 aspect-video md:aspect-auto md:h-full bg-gray-100 animate-pulse rounded" />
              <div className="flex-1 aspect-video md:aspect-auto md:h-full bg-gray-100 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-5 lg:max-w-[1480px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-gray-100 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
            <div className="h-6 bg-[#E3572D]/20 animate-pulse rounded w-1/4" />
            <div className="flex gap-6 pt-4 border-t border-[#eeeeee]">
              <div className="h-4 bg-gray-100 animate-pulse rounded w-16" />
              <div className="h-4 bg-gray-100 animate-pulse rounded w-16" />
              <div className="h-4 bg-gray-100 animate-pulse rounded w-20" />
            </div>
            <div className="space-y-2 pt-6">
              <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
              <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
              <div className="h-3 bg-gray-100 animate-pulse rounded w-5/6" />
              <div className="h-3 bg-gray-100 animate-pulse rounded w-4/6" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-gray-100 animate-pulse rounded" />
            <div className="h-32 bg-gray-100 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
