'use client';

import React, { useState, useTransition, useEffect } from 'react';
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Search, Phone, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function Hero({ slides }: { slides?: string[] }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [isSearching, startSearchTransition] = useTransition();
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = slides && slides.length > 0 ? slides : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (type) params.append('type', type);
    if (area) params.append('area', area);
    startSearchTransition(() => {
      router.push(`/listings?${params.toString()}`);
    });
  };

  return (
    <>
      <section
        className="relative h-[60vh] md:h-[75vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-[#0A192F]"
        style={{
          backgroundImage: `url('${heroImages[0]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dynamic Background Slider */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/50 to-[#0A192F] z-10" />
            <ImageWithFallback
              src={heroImages[currentImage]}
              alt="Premium Real Estate"
              fill
              width={1920}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 sm:p-4 rounded-full backdrop-blur-md transition-all text-white border border-white/20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 sm:p-4 rounded-full backdrop-blur-md transition-all text-white border border-white/20"
        >
          <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>

        <div className="container relative z-20 mx-auto px-4 sm:px-6 w-full pt-16 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#E3572D]/20 text-[#E3572D] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 border border-[#E3572D]/30 backdrop-blur-sm">
                Premium Real Estate Platform
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4 sm:mb-6 tracking-tight">
                Discover Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3572D] to-[#ff8c6b]">
                  Perfect Sanctuary
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Experience the pinnacle of luxury living. We provide exclusive access to the most luxurious properties in prime locations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f4f8fb] py-8 sm:py-12 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-b border-gray-200">
        {/* Premium Floating Search Bar - Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-2 sm:p-3 border border-gray-200 shadow-xl">
            <div className="flex flex-col md:flex-row gap-2 bg-gray-50 rounded-xl p-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Location or Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full h-14 pl-12 pr-4 bg-white text-gray-800 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3572D] transition-all border border-gray-200"
                />
              </div>

              <div className="hidden md:block w-px bg-gray-200 my-2"></div>

              <div className="flex-1 relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-14 px-4 bg-white text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E3572D] rounded-lg transition-colors border border-gray-200"
                >
                  <option value="">All Property Types</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                  <option value="Plot">Plot</option>
                  <option value="Rent">Rent</option>
                  <option value="Residential">Residential</option>
                  <option value="Villa">Villa</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                </div>
              </div>

              <div className="hidden md:block w-px bg-gray-200 my-2"></div>

              <div className="flex-1 relative">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-14 px-4 bg-white text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E3572D] rounded-lg transition-colors border border-gray-200"
                >
                  <option value="">All Areas</option>
                  <option value="Aluva">Aluva</option>
                  <option value="Infopark">Infopark</option>
                  <option value="Kakkanad">Kakkanad</option>
                  <option value="Kizhakkambalam">Kizhakkambalam</option>
                  <option value="Pukkattupady">Pukkattupady</option>
                  <option value="Pattimattom">Pattimattom</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={isSearching}
                className="h-14 px-8 bg-[#E3572D] hover:bg-[#ff693e] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 whitespace-nowrap"
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4 hidden sm:block" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
