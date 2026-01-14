import React from 'react';

/**
 * CTAConsultation Component
 * 
 * A pixel-perfect clone of the "Looking to Buy or Sell?" call-to-action section.
 * Adheres to the light theme, specific typography scale, and layout spacing 
 * defined in the design system.
 */
const CTAConsultation: React.FC = () => {
  return (
    <section 
      className="bg-white"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="container">
        <div className="flex flex-col items-start max-w-[1140px] mx-auto">
          {/* Section Heading */}
          <h2 
            className="mb-4 text-left"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '1.3',
              color: '#000000',
              maxWidth: '600px',
            }}
          >
            Looking to Buy or Sell? <br />
            Get Expert Guidance Today!
          </h2>

          {/* Section Subtext */}
          <p 
            className="mb-8 text-left"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '1.7',
              color: '#333333',
              maxWidth: '500px',
            }}
          >
            Contact us now for a free consultation and let our team of experts guide you through the process.
          </p>

          {/* CTA Button */}
          <a 
            href="/contact"
            className="btn-primary"
            style={{
              backgroundColor: '#357388',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              padding: '12px 25px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAConsultation;