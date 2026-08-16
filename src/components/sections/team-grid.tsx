import React from 'react';
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Phone, Mail } from 'lucide-react';

/**
 * TeamGrid Component
 * Clones the "Our Team" section from FYD-Homes.
 * Features a heading and a grid of team members with image overlays and contact info.
 */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'jomon',
    name: 'Jomon',
    role: 'Agent',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-03-1-scaled-7.png',
    phone: '+919037013117',
    email: 'findyourdreamhome8@gmail.com',
  },
  {
    id: 'shyam',
    name: 'Shyam',
    role: 'Agent',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-02-scaled-8.png',
    phone: '+919544593991',
    email: 'shyamdio6@gmail.com',
  },
  {
    id: 'akhil',
    name: 'Akhil',
    role: 'Agent',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-01-scaled-5.png',
    phone: '+919656637339',
    email: 'akhilejohn805@gmail.com',
  },
  {
    id: 'anandakrishnan',
    name: 'Anandakrishnan',
    role: 'Agent',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/FYDS-ANANDU-6.jpg',
    phone: '+9170120 38201',
    email: 'anandan989511791@gmail.com',
  },
];

export default function TeamGrid({ agentImages = [] }: { agentImages?: string[] }) {
  return (
    <section className="bg-[#0A192F] py-[80px]">
      <div className="container mx-auto px-6 max-w-[1140px]">
        {/* Section Heading */}
        <div className="mb-[50px]">
          <h2 className="font-display text-[32px] font-bold leading-[1.3] text-white mb-4">
            Our Team
          </h2>
          <div className="w-full h-[1px]"></div> {/* Spacer simulation from elementor structure */}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="flex flex-col group mb-8 lg:mb-0">
              {/* Member Card Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] mb-4">
                {/* Sharp full image - fills box via object-cover, anchored to top to see face */}
                <ImageWithFallback
                  src={agentImages[index] || member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Info & Contact Details below the card */}
              <div className="flex flex-col space-y-2 px-1">
                <div>
                  <h3 className="text-white font-sans text-[18px] font-bold leading-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 font-sans text-[13px] font-normal m-0 p-0 leading-tight mb-2">
                    {member.role}
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="flex items-center text-[#E3572D] text-[13px] hover:opacity-80 transition-opacity"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 -rotate-90" />
                    <span className="font-sans font-medium">{member.phone}</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center text-[#E3572D] text-[13px] hover:opacity-80 transition-opacity"
                  >
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    <span className="font-sans font-medium">{member.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}