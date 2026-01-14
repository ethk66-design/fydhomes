import React from 'react';

const GoogleMaps = () => {
  return (
    <section 
      className="elementor-element elementor-element-2ab1a60 animated-fast e-flex e-con-boxed e-con e-parent e-lazyloaded animated fadeIn" 
      data-id="2ab1a60" 
      data-element_type="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        backgroundColor: '#ffffff',
        animationDuration: '0.8s'
      }}
    >
      <div 
        className="e-con-inner" 
        style={{
          width: '100%',
          maxWidth: '1170px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '15px',
          paddingRight: '15px'
        }}
      >
        <div 
          className="elementor-element elementor-element-c33c852 e-con-full e-flex e-con e-child" 
          data-id="c33c852" 
          data-element_type="container"
          style={{
            display: 'flex',
            width: '100%'
          }}
        >
          <div 
            className="elementor-element elementor-element-e0a9341 e-con-full e-flex e-con e-child" 
            data-id="e0a9341" 
            data-element_type="container"
            style={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#A5DFF1',
              minHeight: '400px'
            }}
          >
            <div 
              className="elementor-element elementor-element-0db0971 elementor-widget elementor-widget-google_maps" 
              data-id="0db0971" 
              data-element_type="widget" 
              data-widget_type="google_maps.default"
              style={{
                width: '100%',
                height: '400px'
              }}
            >
              <div 
                className="elementor-widget-container"
                style={{
                  height: '100%'
                }}
              >
                <div 
                  className="elementor-custom-embed"
                  style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <iframe 
                    src="https://maps.google.com/maps?q=FYD%20MEDIA&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near" 
                    aria-label="FYD MEDIA"
                    style={{
                      border: '0',
                      width: '100%',
                      height: '100%',
                      filter: 'grayscale(0) contrast(1.1) opacity(0.9)',
                      transition: 'opacity 0.3s'
                    }}
                    title="FYD MEDIA Location"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual spacer to match the original design gap before content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .elementor-element-2ab1a60 {
          margin-bottom: 50px;
        }
        @media (max-width: 767px) {
          .elementor-element-2ab1a60 {
            margin-bottom: 30px;
          }
          .elementor-element-0db0971 {
            height: 300px !important;
          }
        }
      `}} />
    </section>
  );
};

export default GoogleMaps;