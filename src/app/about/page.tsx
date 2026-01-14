import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#f4f8fb] py-[60px] md:py-[80px]">
        <div className="container mx-auto px-5">
          <div className="max-w-[800px]">
            <h1 className="text-[40px] md:text-[56px] font-bold text-black leading-tight mb-6">
              About FYD Homes
            </h1>
            <p className="text-[18px] text-[#5c5c5c] leading-relaxed">
              We are Kochi's premier real estate consultancy, dedicated to helping you find your perfect space with trust, transparency, and local expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-[80px]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#2b7489]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg>
                </span>
                <span className="uppercase text-[12px] font-bold tracking-widest text-[#2b7489]">Our Journey</span>
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-black mb-6">Redefining Real Estate in Kerala</h2>
              <div className="space-y-4 text-[#5c5c5c] text-[16px] leading-[1.7]">
                <p>
                  Started with a vision to simplify the complex real estate market in Kochi, Find Your Dream Home (FYD Homes) has grown into one of the most trusted names in the region.
                </p>
                <p>
                  We understand that a home is more than just four walls; it's the foundation of your future. That's why we combine deep local market knowledge with modern technology to provide a seamless experience for buyers, sellers, and renters alike.
                </p>
                <p>
                  Our presence on social media with over 295K+ followers is a testament to the trust our community places in us. We don't just list properties; we build relationships.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/about-image.jpg" 
                alt="FYD Homes Team" 
                className="rounded-[10px] w-full shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-[80px] bg-[#f8fafc]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-[15px] shadow-sm">
              <div className="w-12 h-12 bg-[#2b7489]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2b7489]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                To empower our clients by providing expert guidance, transparent information, and a curated selection of properties that match their lifestyle and investment goals.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[15px] shadow-sm">
              <div className="w-12 h-12 bg-[#1db954]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                To be the most preferred and innovative real estate partner in Kerala, known for setting standards of excellence and creating lasting value for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[80px]">
        <div className="container mx-auto px-5 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-[44px] font-bold text-black mb-1">295K+</div>
              <div className="text-[#2b7489] font-medium">Followers</div>
            </div>
            <div>
              <div className="text-[44px] font-bold text-black mb-1">500+</div>
              <div className="text-[#2b7489] font-medium">Properties Sold</div>
            </div>
            <div>
              <div className="text-[44px] font-bold text-black mb-1">10+</div>
              <div className="text-[#2b7489] font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-[44px] font-bold text-black mb-1">16K+</div>
              <div className="text-[#2b7489] font-medium">Subscribers</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
