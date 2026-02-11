import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section
      className="elementor-element elementor-element-2ab1a60 animated-fast e-flex e-con-boxed e-con e-parent e-lazyloaded animated fadeIn flex p-0 w-full bg-transparent relative mb-[60px]"
      data-id="2ab1a60"
      data-element_type="container"
    >
      <div
        className="e-con-inner flex w-full max-w-[1140px] mx-auto px-[15px]"
      >
        <div
          className="elementor-element elementor-element-c33c852 e-con-full e-flex e-con e-child w-full flex flex-col"
          data-id="c33c852"
        >
          <div
            className="elementor-element elementor-element-e0a9341 e-con-full e-flex e-con e-child w-full flex bg-transparent"
            data-id="e0a9341"
          >
            <div
              className="elementor-element elementor-element-0db0971 elementor-widget elementor-widget-google_maps w-full relative"
              data-id="0db0971"
            >
              <div
                className="elementor-widget-container w-full h-[400px] bg-[#91d8e9] overflow-hidden"
              >
                <div
                  className="elementor-custom-embed w-full h-full"
                >
                  <iframe
                    src="https://maps.google.com/maps?q=FYD%20MEDIA&t=m&z=14&output=embed&iwloc=near"
                    aria-label="FYD MEDIA"
                    className="w-full h-full border-0 grayscale-0"
                    loading="lazy"
                    title="FYD MEDIA Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;