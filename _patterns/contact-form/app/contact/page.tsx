// Contact page -- self-contained for the contact-form pattern.
// Only imports from relative paths within the pattern.

import type { Metadata } from 'next';

import { ContactForm } from '../../components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Get in Touch</h1>
      <p className="text-gray-600 mb-8">
        Have a question or want to work together? Fill out the form below and we
        will get back to you as soon as possible.
      </p>

      <ContactForm />
    </main>
  );
}
