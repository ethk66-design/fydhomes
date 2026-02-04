import React from 'react';
import { getSeoMetadata } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return getSeoMetadata("/contact", "Contact Us | FYD Homes", "Get in touch with FYD Homes for inquiries, consultations, or property visits.");
}

import PageTitle from '@/components/sections/page-title';
import GoogleMaps from '@/components/sections/google-maps';
import ContactForm from '@/components/sections/contact-form';

import { getPageAsset } from "@/lib/assets";

export default async function ContactPage() {
  const heroBg = await getPageAsset('/contact', 'hero_bg', "");

  return (
    <main className="min-h-screen bg-white">
      <PageTitle bgImage={heroBg} />
      <GoogleMaps />
      <ContactForm />
    </main>
  );
}
