"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/listings?${params.toString()}`;
  };

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-[#E3572D] hover:text-white hover:border-[#E3572D] transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed"
          disabled
          aria-label="Previous page (disabled)"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-gray-600 hover:bg-[#E3572D] hover:text-white transition-all"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-gray-400 px-1">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${
            currentPage === page
              ? 'bg-[#E3572D] text-white shadow-md'
              : 'text-gray-600 hover:bg-[#E3572D] hover:text-white'
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400 px-1">...</span>}
          <Link
            href={createPageUrl(totalPages)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-gray-600 hover:bg-[#E3572D] hover:text-white transition-all"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-[#E3572D] hover:text-white hover:border-[#E3572D] transition-all"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </Link>
      ) : (
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed"
          disabled
          aria-label="Next page (disabled)"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
