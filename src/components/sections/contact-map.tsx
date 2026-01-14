import React from 'react';

const ContactMap = () => {
  return (
    <section 
      className="elementor-element elementor-element-2ab1a60 animated-fast e-flex e-con-boxed e-con e-parent animated fadeIn" 
      data-id="2ab1a60" 
      data-element_type="container"
      style={{
        paddingTop: '0px',
        paddingBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'var(--color-background)',
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
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column'
          }}
        >
          <div 
            className="elementor-element elementor-element-e0a9341 e-con-full e-flex e-con e-child" 
            data-id="e0a9341"
            style={{
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              border: '1px solid #E5E5E5',
              transition: 'background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s'
            }}
          >
            <div 
              className="elementor-element elementor-element-0db0971 elementor-widget elementor-widget-google_maps" 
              data-id="0db0971" 
              data-element_type="widget" 
              data-widget_type="google_maps.default"
              style={{
                width: '100%'
              }}
            >
              <div className="elementor-widget-container">
                <div 
                  className="elementor-custom-embed"
                  style={{
                    lineHeight: 0
                  }}
                >
                  <iframe 
                    src="https://maps.google.com/maps?q=FYD%20MEDIA&t=m&z=14&output=embed&iwloc=near" 
                    aria-label="FYD MEDIA"
                    style={{
                      width: '100%',
                      height: '400px',
                      border: 0,
                      display: 'block'
                    }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="FYD MEDIA Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;