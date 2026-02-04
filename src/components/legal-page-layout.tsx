
import React from 'react';

interface LegalPageLayoutProps {
    title: string;
    children: React.ReactNode;
    lastUpdated?: string;
}

const LegalPageLayout = ({ title, children, lastUpdated }: LegalPageLayoutProps) => {
    return (
        <main className="min-h-screen bg-white pt-[120px] pb-16 sm:pb-24">
            <div className="container mx-auto px-4 sm:px-6 max-w-[1000px]">

                {/* Header */}
                <div className="mb-10 sm:mb-14 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] mb-4">
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-[#666666] text-sm sm:text-base">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                    <div className="w-16 h-1 bg-[#2d7a8c] mx-auto mt-6 rounded-full" />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-[#555555] prose-headings:text-[#222222] prose-headings:font-bold prose-a:text-[#2d7a8c] prose-a:no-underline hover:prose-a:underline prose-li:marker:text-[#2d7a8c]">
                    {children}
                </div>

            </div>
        </main>
    );
};

export default LegalPageLayout;
