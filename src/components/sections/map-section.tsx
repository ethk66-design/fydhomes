import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section 
      className="elementor-element elementor-element-2ab1a60 animated-fast e-flex e-con-boxed e-con e-parent e-lazyloaded animated fadeIn" 
      data-id="2ab1a60" 
      data-element_type="container"
      style={{
        display: 'flex',
        padding: '0px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'relative',
        marginBottom: '60px'
      }}
    >
      <div 
        className="e-con-inner" 
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1140px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '15px',
          paddingRight: '15px'
        }}
      >
        <div 
          className="elementor-element elementor-element-c33c852 e-con-full e-flex e-con e-child" 
          data-id="c33c852" 
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div 
            className="elementor-element elementor-element-e0a9341 e-con-full e-flex e-con e-child" 
            data-id="e0a9341" 
            style={{
              width: '100%',
              display: 'flex',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
          >
            <div 
              className="elementor-element elementor-element-0db0971 elementor-widget elementor-widget-google_maps" 
              data-id="0db0971" 
              style={{
                width: '100%',
                position: 'relative'
              }}
            >
              <div 
                className="elementor-widget-container"
                style={{
                  width: '100%',
                  height: '400px', // Standard height as per usual layout for this section
                  backgroundColor: '#91d8e9', // Theme placeholder color
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="elementor-custom-embed"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <iframe 
                    src="https://maps.google.com/maps?q=FYD%20MEDIA&t=m&z=14&output=embed&iwloc=near" 
                    aria-label="FYD MEDIA"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: '0px',
                      filter: 'grayscale(0%)',
                    }}
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