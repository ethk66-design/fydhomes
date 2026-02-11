"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Jomon',
    role: 'Agent',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-01-scaled-5.png',
    phone: '+919037013117',
    email: 'findyourdreamhome8@gmail.com',
  },
  {
    name: 'Shyam',
    role: 'Agent',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-03-1-scaled-7.png',
    phone: '+919544593991',
    email: 'shyamdio6@gmail.com',
  },
  {
    name: 'Jose',
    role: 'Agent',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-02-scaled-6.png',
    phone: '+919946531317',
    email: 'josepavoo@gmail.com',
  },
  {
    name: 'Akhil',
    role: 'Agent',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-01-scaled-5.png',
    phone: '+919656637339',
    email: 'akhilejohn805@gmail.com',
  },
  {
    name: 'Anandakrishnan',
    role: 'Agent',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/FYDS-ANANDU-6.jpg',
    phone: '+9170120 38201',
    email: 'anandan989511791@gmail.com',
  },
];

export function OurTeam() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((el, index) => {
      if (el) {
        el.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }, []);

  return (
    <section className="py-[60px] md:py-[80px] bg-white">
      <div className="container mx-auto px-5">
        <div className="text-center mb-[40px] md:mb-[60px]">
          <span className="text-[#1db954] uppercase tracking-wider font-semibold text-sm mb-2 block animate-fade-in-up">
            Our Team
          </span>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#222222] mb-4 animate-fade-in-up animation-delay-100">
            Meet Our Real Estate Agents
          </h2>
          <p className="max-w-[700px] mx-auto text-[#666666] leading-relaxed animate-fade-in-up animation-delay-200">
            Our dedicated team of professionals with years of experience in the Kochi real estate market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[50px]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="group animate-fade-in-up"
            >
              <div className="relative aspect-[4/5] rounded-[10px] overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 team-card-overlay flex flex-col justify-end p-6 text-center">
                  <h3 className="text-white text-[18px] font-semibold mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-[14px] font-normal leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5 px-1">
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  className="flex items-center text-[13px] text-[#555555] hover:text-[#307185] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#307185]" />
                  <span>{member.phone}</span>
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center text-[13px] text-[#555555] hover:text-[#307185] transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 mr-2 text-[#307185]" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;