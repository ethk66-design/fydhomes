import React from 'react';

const ErrorContent: React.FC = () => {
  return (
    <section
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#ffffff'
      }}
      className="page-wrap"
    >
      <div className="container" style={{ maxWidth: '1170px', margin: '0 auto', paddingLeft: '15px', paddingRight: '15px' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}>
          <div
            className="col-lg-12 col-md-12"
            style={{
              position: 'relative',
              width: '100%',
              paddingRight: '15px',
              paddingLeft: '15px',
              flex: '0 0 100%',
              maxWidth: '100%'
            }}
          >
            <div className="article-wrap">
              <article className="article-page-wrap">
                <div
                  className="error-404-page text-center"
                  style={{
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}
                >
                  <h1
                    style={{
                      fontFamily: '"Roboto Slab", ui-serif, Georgia, serif',
                      fontSize: '42px',
                      fontWeight: 600,
                      lineHeight: '1.2',
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      marginBottom: '20px'
                    }}
                  >
                    Oh oh! Page not found.
                  </h1>

                  <p
                    style={{
                      fontFamily: '"Roboto", ui-sans-serif, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '1.6',
                      color: '#666666',
                      marginBottom: '30px'
                    }}
                  >
                    We&apos;re sorry, but the page you are looking for doesn&apos;t exist. You can search your topic using the box below or return to the homepage.
                  </p>

                  <a
                    href="/"
                    className="btn btn-link"
                    style={{
                      fontFamily: '"Roboto", ui-sans-serif, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#0073aa',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#19a941')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#0073aa')}
                  >
                    Back to Homepage
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorContent;