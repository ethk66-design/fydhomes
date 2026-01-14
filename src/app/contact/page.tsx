import React from 'react';
import PageTitle from '@/components/sections/page-title';
import GoogleMaps from '@/components/sections/google-maps';
import ContactForm from '@/components/sections/contact-form';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageTitle />
      <GoogleMaps />
      <ContactForm />
    </main>
  );
}
