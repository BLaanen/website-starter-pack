'use server';

// Contact form Server Action -- self-contained for the contact-form pattern.
// Only imports from npm packages and relative paths within the pattern.

import { contactFormSchema } from '../lib/validation';

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success?: boolean;
};

const initialState: ContactFormState = { message: '', success: false };

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    // TODO: Replace with Resend email delivery.
    // Install: npm install resend
    //
    // import { Resend } from 'resend';
    // import { ContactNotificationEmail } from '../emails/contact-notification';
    //
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: process.env.RESEND_FROM_EMAIL ?? 'Contact Form <onboarding@resend.dev>',
    //   to: process.env.CONTACT_FORM_TO_EMAIL ?? 'hello@example.com',
    //   subject: `New contact form submission from ${result.data.name}`,
    //   react: ContactNotificationEmail({
    //     name: result.data.name,
    //     email: result.data.email,
    //     message: result.data.message,
    //   }),
    // });

    // Placeholder: log to console until Resend is configured.
    console.log('Contact form submission:', result.data);

    return {
      message: 'Thank you! Your message has been received.',
      success: true,
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      message: 'Something went wrong. Please try again later.',
      success: false,
    };
  }
}

export { initialState };
