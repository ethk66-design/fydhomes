import React from 'react';

const GoogleMaps = () => {
  return (
    <section className="w-full h-[350px] sm:h-[450px] md:h-[550px] bg-[#040C1A] relative z-10 shadow-2xl">
      <iframe
        src="https://maps.google.com/maps?q=FYD%20MEDIA&t=m&z=14&output=embed&iwloc=near"
        aria-label="FYD MEDIA"
        className="w-full h-full border-0 filter grayscale contrast-110 opacity-70 hover:opacity-100 transition-opacity duration-300"
        title="FYD MEDIA Location"
        loading="lazy"
        allowFullScreen
      />
    </section>
  );
};

export default GoogleMaps;