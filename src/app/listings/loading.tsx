"use client";

export default function ListingsLoading() {
  return (
    <main className="min-h-screen bg-white pb-12 sm:pb-20">
      <div className="h-[20px] sm:h-[40px] bg-[#f4f8fb]" />

      {/* Search Filter Skeleton */}
      <div className="bg-[#f4f8fb] pt-4 sm:pt-6 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-5">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-6" />
          <div className="max-w-[1170px] mx-auto bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 h-[45px] bg-gray-100 animate-pulse rounded" />
              <div className="flex-1 h-[45px] bg-gray-100 animate-pulse rounded" />
              <div className="flex-1 h-[45px] bg-gray-100 animate-pulse rounded" />
              <div className="w-[130px] h-[45px] bg-[#1db954]/30 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="container mx-auto px-4 sm:px-5 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#eeeeee] overflow-hidden">
              <div className="w-full h-[200px] bg-gray-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                <div className="h-5 bg-[#2d7a8c]/20 animate-pulse rounded w-1/3" />
                <div className="border-t border-[#eeeeee] pt-3 flex gap-4">
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-10" />
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-10" />
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
