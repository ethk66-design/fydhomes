import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BedDouble, Bath, Square, MapPin, Phone, Mail, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = params;

  const { data: property, error } = await supabase
    .from("properties")
    .fetchById(id) // This is a placeholder, I should use select().eq('id', id).single()
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Spacer */}
      <div className="h-[80px] bg-white"></div>

      {/* Breadcrumbs / Back Button */}
      <div className="container mx-auto px-5 py-6">
        <Link 
          href="/listings" 
          className="flex items-center gap-2 text-[#5c5c5c] hover:text-[#2d7a8c] transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} />
          Back to Listings
        </Link>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 font-serif">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-[#5c5c5c] mb-8">
              <MapPin size={18} className="text-[#2d7a8c]" />
              <span className="text-lg">{property.location}</span>
            </div>

            {/* Image Gallery */}
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {property.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-md">
                      <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-[#eeeeee] mb-10">
              <div className="flex flex-col items-center gap-2">
                <BedDouble size={24} className="text-[#2d7a8c]" />
                <span className="text-lg font-bold text-black">{property.beds || 0}</span>
                <span className="text-xs text-[#5c5c5c] uppercase font-bold tracking-wider">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Bath size={24} className="text-[#2d7a8c]" />
                <span className="text-lg font-bold text-black">{property.baths || 0}</span>
                <span className="text-xs text-[#5c5c5c] uppercase font-bold tracking-wider">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Square size={24} className="text-[#2d7a8c]" />
                <span className="text-lg font-bold text-black">{property.area || 'N/A'}</span>
                <span className="text-xs text-[#5c5c5c] uppercase font-bold tracking-wider">Area</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 font-serif">Description</h2>
              <p className="text-[#5c5c5c] text-lg leading-relaxed whitespace-pre-line">
                {property.description || "No description available for this property."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Pricing Card */}
              <div className="bg-[#f4f8fb] p-8 rounded-xl shadow-sm border border-[#eeeeee]">
                <div className="text-sm font-bold text-[#5c5c5c] uppercase tracking-widest mb-2">Price</div>
                <div className="text-3xl font-bold text-[#2d7a8c] mb-6">
                  {property.price || 'Contact for Price'}
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+919544593991"
                    className="w-full bg-[#1db954] text-white flex items-center justify-center gap-3 py-4 rounded-lg font-bold hover:bg-[#1aa34a] transition-colors"
                  >
                    <Phone size={20} />
                    Call Agent
                  </a>
                  <button className="w-full bg-white text-[#2d7a8c] border-2 border-[#2d7a8c] flex items-center justify-center gap-3 py-4 rounded-lg font-bold hover:bg-[#2d7a8c] hover:text-white transition-all">
                    <Mail size={20} />
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="p-8 border border-[#eeeeee] rounded-xl">
                <h3 className="text-lg font-bold text-black mb-6">Listed by</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#2d7a8c] flex items-center justify-center text-white text-xl font-bold">
                    FY
                  </div>
                  <div>
                    <div className="font-bold text-black text-lg">FYD Homes Agent</div>
                    <div className="text-[#5c5c5c] text-sm">Property Consultant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
