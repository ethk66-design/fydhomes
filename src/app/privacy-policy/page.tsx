
import React from 'react';
import LegalPageLayout from '@/components/legal-page-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | FYD Homes',
    description: 'Read our Privacy Policy to understand how FYD Homes collects, uses, and protects your personal information.',
};

const PrivacyPolicyPage = () => {
    return (
        <LegalPageLayout
            title="Privacy Policy"
        >
            <div className="space-y-8 text-base sm:text-lg leading-relaxed">
                <p>
                    At FYD Homes, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.fydhomes.in, or engage with our services. Please read this policy carefully to understand our practices regarding your personal information.
                </p>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">1. Information We Collect</h2>
                    <p className="mb-4">We may collect the following types of information when you interact with our website:</p>

                    <h3 className="text-xl font-semibold mb-2 mt-4 text-[#2d7a8c]">a) Personal Information</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Mailing address</li>
                        <li>Any information you voluntarily submit via forms, inquiries, or registrations</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-4 text-[#2d7a8c]">b) Non-Personal Information</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Browser type and version</li>
                        <li>IP address</li>
                        <li>Device information</li>
                        <li>Pages you visit on our website</li>
                        <li>Time and date of visits</li>
                        <li>Referring websites</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-4 text-[#2d7a8c]">c) Transaction & Service Information</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Details of real estate inquiries, property interests, and communications</li>
                        <li>Any other data related to the services you request</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">2. How We Use Your Information</h2>
                    <p className="mb-4">We use the information collected for purposes including but not limited to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Responding to inquiries and providing requested services</li>
                        <li>Sending property updates, newsletters, or marketing communications (with your consent)</li>
                        <li>Personalizing user experience on our website</li>
                        <li>Improving website functionality, design, and security</li>
                        <li>Complying with legal obligations and resolving disputes</li>
                        <li>Analyzing website traffic and user behavior for better service</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">3. Legal Basis for Processing (GDPR Compliance, if applicable)</h2>
                    <p className="mb-4">If you are located in a region governed by GDPR or similar laws, we process your data under the following legal bases:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Consent:</strong> When you provide your information voluntarily.</li>
                        <li><strong>Legitimate Interests:</strong> For business analytics, marketing, or improving services.</li>
                        <li><strong>Contractual Necessity:</strong> When providing real estate services requested by you.</li>
                        <li><strong>Legal Obligations:</strong> Where laws require retention or disclosure of data.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">4. Cookies and Tracking Technologies</h2>
                    <p className="mb-4">We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Enhance site performance</li>
                        <li>Remember user preferences</li>
                        <li>Analyze visitor trends</li>
                    </ul>
                    <p>You can choose to disable cookies in your browser settings. However, certain features of the website may not function properly without them.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">5. Sharing & Disclosure of Information</h2>
                    <p className="mb-4">We do not sell, rent, or trade your personal information. We may share information with:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Service Providers:</strong> Such as IT support, marketing agencies, or hosting providers, who assist in website operations.</li>
                        <li><strong>Legal Authorities:</strong> When required by law, regulation, or court order.</li>
                        <li><strong>Business Transfers:</strong> In case of mergers, acquisitions, or sale of company assets.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">6. Data Security</h2>
                    <p>We adopt reasonable technical, administrative, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">7. Data Retention</h2>
                    <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">8. Your Rights</h2>
                    <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li><strong>Access & Correction:</strong> Request access to or correction of your personal data.</li>
                        <li><strong>Data Deletion:</strong> Request deletion of your personal information.</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a structured format.</li>
                        <li><strong>Opt-Out of Marketing:</strong> Stop receiving marketing communications.</li>
                    </ul>
                    <p>To exercise your rights, please contact us using the details below.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">9. Third-Party Links</h2>
                    <p>Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party sites.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">10. Children’s Privacy</h2>
                    <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">11. International Data Transfers</h2>
                    <p>If you are accessing our website from outside India, please note that your information may be transferred to and processed in India, where data protection laws may differ from those in your country.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">12. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time to reflect changes in legal requirements or our practices. Any updates will be posted on this page with the revised date.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">13. Contact Us</h2>
                    <p className="mb-4">For any questions about this Privacy Policy or how your data is handled, please contact us:</p>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <p className="font-bold text-lg mb-1">FYD Homes</p>
                        <p className="mb-1"><span className="font-medium text-black">Email:</span> <a href="mailto:info@fydhomes.com" className="text-[#2d7a8c] hover:underline">info@fydhomes.com</a></p>
                        <p><span className="font-medium text-black">Phone:</span> <a href="tel:+919544593991" className="text-[#2d7a8c] hover:underline">+91 9544593991</a></p>
                    </div>
                </section>
            </div>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;
