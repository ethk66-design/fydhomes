import React from 'react';
import PageTitle from '@/components/sections/page-title';
import MapSection from '@/components/sections/map-section';
import ContactDetailsForm from '@/components/sections/contact-details-form';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageTitle />
      <MapSection />
      <ContactDetailsForm />
    </main>
  );
}
