'use server';

import { contactSchema } from '@/lib/validations/contact';

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    // TODO: Integrate email service (Resend) in Phase 7
    console.log('Contact form submission:', result.data);

    return {
      message: 'Thank you! Your message has been received.',
      success: true,
    };
  } catch {
    return {
      message: 'Something went wrong. Please try again later.',
      success: false,
    };
  }
}
