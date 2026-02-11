"use client";

import React, { useEffect, useRef } from 'react';

interface ProjectsHeroProps {
    heroBg?: string | null;
}

export function ProjectsHero({ heroBg }: ProjectsHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (sectionRef.current && heroBg) {
            sectionRef.current.style.setProperty('--hero-bg', `url(${heroBg})`);
        }
    }, [heroBg]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#1db954] py-[60px] md:py-[80px] text-white relative overflow-hidden bg-cover bg-center bg-[image:var(--hero-bg)]"
        >
            {heroBg && <div className="absolute inset-0 bg-black/50 z-0"></div>}
            <div className="container mx-auto px-5 relative z-10">
                <div className="max-w-[800px]">
                    <h1 className="text-[40px] md:text-[56px] font-bold leading-tight mb-6">
                        Our Premium Projects
                    </h1>
                    <p className="text-[18px] md:text-[20px] opacity-90 leading-relaxed">
                        Discover a lifestyle of elegance and comfort with FYD Homes. From luxury villas to premium plots, we build homes that redefine modern living.
                    </p>
                </div>
            </div>
        </section>
    );
}
