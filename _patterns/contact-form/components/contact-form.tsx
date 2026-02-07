'use client';

// Contact form component -- self-contained for the contact-form pattern.
// Only imports from npm packages and relative paths within the pattern.

import { useActionState } from 'react';

import {
  submitContactForm,
  initialState,
  type ContactFormState,
} from '../actions/submit-contact';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  // After successful submission, show success message only.
  if (state.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-medium text-green-800">{state.message}</p>
        <p className="mt-2 text-sm text-green-600">
          We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? 'name-error' : undefined}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-red-600" role="alert">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-red-600" role="alert">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your message..."
          aria-invalid={!!state.errors?.message}
          aria-describedby={
            state.errors?.message ? 'message-error' : undefined
          }
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-red-600" role="alert">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>

      {/* Server error (non-field) */}
      {state.message && !state.success && !state.errors && (
        <p className="text-sm text-red-600" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
