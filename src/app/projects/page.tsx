import React from 'react';
import { getSeoMetadata } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return getSeoMetadata("/projects", "Our Projects | FYD Homes", "Explore our premium ongoing and completed residential projects in Kochi.");
}

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Luxury Hillside Villas",
    location: "Kakkanad, Kochi",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "A premium gated community featuring 4BHK villas with private pools and breathtaking views."
  },
  {
    id: 2,
    title: "The Waterfront Apartments",
    location: "Marine Drive, Kochi",
    status: "Launch Soon",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Ultra-luxury waterfront residences with world-class amenities and sunset views."
  },
  {
    id: 3,
    title: "Green Valley Plots",
    location: "Aluva, Kochi",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Eco-friendly residential plots nestled in nature, perfect for building your dream home."
  }
];

import { getPageAsset } from "@/lib/assets";
import { ProjectsHero } from "@/components/sections/projects-hero";

export default async function ProjectsPage() {
  const heroBg = await getPageAsset('/projects', 'hero_bg', "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");

  return (
    <main className="min-h-screen bg-white pt-[120px]">
      {/* Hero Section */}
      <ProjectsHero heroBg={heroBg} />

      {/* Projects Grid */}
      <section className="py-[80px]">
        <div className="container mx-auto px-5">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-[20px] shadow-2xl group h-[400px] md:h-[500px] w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider text-white ${project.status === 'Ongoing' ? 'bg-[#2b7489]' :
                        project.status === 'Completed' ? 'bg-[#1db954]' : 'bg-[#eab308]'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#2b7489]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg>
                    </span>
                    <span className="uppercase text-[12px] font-bold tracking-widest text-[#2b7489]">{project.location}</span>
                  </div>
                  <h2 className="text-[32px] md:text-[44px] font-bold text-black mb-6 leading-tight">{project.title}</h2>
                  <p className="text-[#5c5c5c] text-[18px] leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <Link
                    href={`/contact?subject=Inquiry about ${project.title}`}
                    className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-[8px] font-bold uppercase text-[13px] tracking-[1.5px] hover:bg-[#2b7489] transition-all"
                  >
                    Get Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-[100px] bg-[#f4f8fb]">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-[#5c5c5c] text-[18px] max-w-[700px] mx-auto mb-10 leading-relaxed">
            Whether you&apos;re looking to invest in our upcoming projects or want us to help launch yours, we&apos;re ready to partner with you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1db954] text-white px-10 py-5 rounded-[8px] font-bold uppercase text-[14px] tracking-[2px] hover:shadow-lg transition-all"
          >
            Work With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
