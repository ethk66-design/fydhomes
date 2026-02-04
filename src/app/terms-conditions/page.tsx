
import React from 'react';
import LegalPageLayout from '@/components/legal-page-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | FYD Homes',
    description: 'Read the Terms & Conditions for using FYD Homes services and website.',
};

const TermsPage = () => {
    return (
        <LegalPageLayout
            title="Terms & Conditions"
        >
            <div className="space-y-8 text-base sm:text-lg leading-relaxed">

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">1. Introduction</h2>
                    <p>
                        This Privacy Policy applies to FYD Homes, a real‑estate marketing company based in India. It explains what personal data we collect, why we collect it, how we use and share it, how it’s safeguarded, your rights, and how to contact us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">2. Data We Collect</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Personal Data:</strong> name, email, phone number, mailing address.</li>
                        <li><strong>Marketing Preferences:</strong> opt-in for newsletters, communication preferences.</li>
                        <li><strong>Technical & Cookies:</strong> IP address, device/browser information, analytics data.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">3. Purpose & Legal Basis</h2>
                    <p className="mb-4">We collect and process your personal data to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Respond to inquiries and provide property-related information.</li>
                        <li>Send marketing communications only with your consent, which you can withdraw at any time.</li>
                        <li>Conduct internal analytics and improve services.</li>
                        <li>Comply with legal requirements.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">4. How We Collect Data</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Via contact forms, property inquiry forms, lead capture on websites.</li>
                        <li>From publicly available sources or property portals.</li>
                        <li>Through cookies, analytics, and tracking tools (with opt‑in for non‑essential types).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">5. How We Use Your Data</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>To respond to inquiries and promote listed properties.</li>
                        <li>To send newsletters, alerts, or updates—only if you’ve given explicit consent.</li>
                        <li>To analyze traffic and improve our website and marketing.</li>
                        <li>To fulfill legal or compliance requirements, including RERA advertising rules.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">6. Data Sharing & Disclosure</h2>
                    <p className="mb-4">We may share your data with:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Third-party service providers (e.g. CRM platforms, analytics providers).</li>
                        <li>Government or regulatory authorities when required by law.</li>
                        <li>Legal parties in compliance or dispute situations.</li>
                    </ul>
                    <p><strong>We do not sell, rent, or trade your personal data.</strong></p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">7. Data Storage & Retention</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Personal data is stored securely and retained only as long as necessary for business operations.</li>
                        <li>Consent and marketing preference records are maintained until revocation.</li>
                        <li>After lead lifecycle or service termination, data is anonymized or purged in accordance with internal and legal retention standards.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">8. Security Measures</h2>
                    <p className="mb-4">We apply adequate security safeguards including encryption, access controls, and audits—aligned with standards under IT Rules 2011 and best practices under DPDP Act.</p>
                    <p className="mb-2">We apply industry-standard security safeguards such as:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Encryption of sensitive data.</li>
                        <li>Access controls and periodic security audits.</li>
                        <li>Compliance with ISO/IEC 27001‑like standards where possible.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">9. Your Rights under Indian Law</h2>
                    <p className="mb-4">Under the DPDP Act, you may:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Access your personal data.</li>
                        <li>Correct or update inaccuracies.</li>
                        <li>Request erasure (“right to be forgotten”).</li>
                        <li>Withdraw consent at any time.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">10. Cookies & Tracking</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>We use essential cookies for website operation.</li>
                        <li>Non-essential cookies (analytics, marketing) are activated only after obtaining your explicit consent.</li>
                        <li>You may change or withdraw consent through browser settings or cookie preference panel.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">12. Policy Updates</h2>
                    <p>
                        We may update this policy periodically—for example, when laws change or our data practices evolve. We will notify you via our website or email, and the effective date will be revised accordingly.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-black">13. Miscellaneous</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Our policy does not apply to third-party websites or apps linked from our site.</li>
                        <li>If you submit personal data through such third-party platforms, you should review their privacy policies.</li>
                    </ul>
                </section>

                <hr className="border-gray-200 my-8" />

                <section className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-sm text-[##555555]">
                    <h3 className="font-bold text-black text-lg mb-3">⚖️ Compliance Summary</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Meets India’s IT Rules, 2011 requirements (collection, consent, security, policy publication).</li>
                        <li>Reflects obligations under the DPDP Act, 2023: transparency, consent mechanism, data-principal rights, grievance procedures, cross-border disclosure if applicable.</li>
                    </ul>
                </section>

            </div>
        </LegalPageLayout>
    );
};

export default TermsPage;
