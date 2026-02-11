import React from 'react';
import Link from 'next/link';

const ErrorContent: React.FC = () => {
  return (
    <section className="page-wrap py-20 bg-white">
      <div className="container mx-auto px-[15px] max-w-[1170px]">
        <div className="row flex flex-wrap -mx-[15px]">
          <div className="col-lg-12 col-md-12 relative w-full px-[15px] flex-[0_0_100%] max-w-full">
            <div className="article-wrap">
              <article className="article-page-wrap">
                <div className="error-404-page text-center max-w-[800px] mx-auto">
                  <h1 className="font-serif text-[42px] font-semibold leading-[1.2] text-black tracking-[-0.02em] mb-5">
                    Oh oh! Page not found.
                  </h1>

                  <p className="font-sans text-base font-normal leading-[1.6] text-[#666666] mb-[30px]">
                    We&apos;re sorry, but the page you are looking for doesn&apos;t exist. You can search your topic using the box below or return to the homepage.
                  </p>

                  <div className="btn-box">
                    <Link
                      href="/"
                      className="inline-block bg-[#1db954] text-white px-[30px] py-[15px] text-sm font-bold uppercase tracking-[1px] rounded-[50px] transition-all duration-300 hover:bg-[#121212] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                    >
                      Back to Homepage
                    </Link>
                  </div>
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