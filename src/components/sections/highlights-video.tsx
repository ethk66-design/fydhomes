import React from 'react';

const HighlightsVideo = ({ videoUrl }: { videoUrl?: string | null }) => {
  if (!videoUrl) return null;

  // Simple helper to extract video ID from standard YouTube URLs
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('embed')) return url;
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?feature=oembed`;
    } catch (e) {
      return url;
    }
  };

  return (
    <section className="container mx-auto px-[20px] py-[60px]">
      <div className="flex flex-col md:flex-row gap-[30px]">
        {/* Left Column: Title and Section Marker */}
        <div className="w-full md:w-1/3">
          <div className="section-marker mb-[12px] relative pl-[20px]">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[12px] h-[12px] border-2 border-brand-blue rounded-full after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[4px] after:h-[4px] after:bg-brand-blue after:rounded-full"></span>
            Property
          </div>
          <h2 className="font-display text-[24px] font-normal leading-[1.3] text-foreground m-0">
            Highlights
          </h2>
        </div>

        {/* Right Column: Video Title and Player */}
        <div className="w-full md:w-2/3">
          <div className="mb-[15px]">
            <h3 className="font-sans text-[15px] font-normal text-foreground border-b border-border pb-[10px] m-0">
              Video
            </h3>
          </div>

          <div className="relative w-full aspect-video rounded-[4px] overflow-hidden bg-secondary">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getEmbedUrl(videoUrl)}
              title="Property Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsVideo;