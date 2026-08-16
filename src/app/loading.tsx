"use client";

export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[500px] sm:h-[600px] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded w-80 mx-auto" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-60 mx-auto" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-12 bg-gray-100 animate-pulse rounded w-24 mx-auto" />
              <div className="h-4 bg-gray-100 animate-pulse rounded w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-gray-100 animate-pulse rounded w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#eeeeee] overflow-hidden">
              <div className="w-full h-[200px] bg-gray-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                <div className="h-5 bg-[#E3572D]/20 animate-pulse rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
